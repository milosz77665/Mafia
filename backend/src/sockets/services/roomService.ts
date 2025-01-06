import { Server, Socket } from 'socket.io';
import { Room } from '../../models/Room';
import { User } from '../../models/User';
import { ObjectId } from 'mongodb';
import { IRoomDocument } from '../../interfaces/IRoom';
import { IUserDocument } from '../../interfaces/IUser';

interface createRoomRequest {
  id: string;
  maxPlayers: number;
}

interface roomRequest {
  id: string;
  roomId: string;
}

interface roomResponse {
  success: boolean;
  message?: string;
  lobby?: IRoomDocument;
}

const validateObjectId = (id: string, callback: (response: roomResponse) => void) => {
  if (!ObjectId.isValid(id)) {
    callback({ success: false, message: 'Invalid user ID' });
    return false;
  }
  return true;
};

const userExists = (user: IUserDocument | null, callback: (response: roomResponse) => void): user is IUserDocument => {
  if (!user) {
    callback({ success: false, message: 'User does not exist' });
    return false;
  }
  return true;
};

const roomExists = (room: IRoomDocument | null, callback: (response: roomResponse) => void): room is IRoomDocument => {
  if (!room) {
    callback({ success: false, message: 'Room does not exist' });
    return false;
  }
  return true;
};

const deleteRoom = async (user: IUserDocument, roomId: string, callback: (response: roomResponse) => void) => {
  await Promise.all([user.save(), Room.deleteOne({ roomId })]);

  console.log(`Room deleted: ${roomId}`);
  callback({ success: true, message: `Room ${roomId} was deleted` });
};

export const roomService = (socket: Socket, io: Server) => {
  socket.on('createRoom', async (data: createRoomRequest, callback: (response: roomResponse) => void) => {
    try {
      const { id, maxPlayers } = data;

      if (!validateObjectId(id, callback)) return;

      if (maxPlayers < 6 || maxPlayers > 20) {
        callback({ success: false, message: 'Invalid number of players. Must be between 6 and 20' });
        return;
      }

      const user = await User.findById(id);
      if (!userExists(user, callback)) return;

      user.isHost = true;
      user.socketId = socket.id;

      const roomId = await Room.generateUniqueRoomId();
      const room = new Room({ roomId, hostId: user._id, players: [user._id], maxPlayers });

      socket.join(roomId);

      await Promise.all([user.save(), room.save(), room.populate('players')]);

      console.log(`Room ${roomId} created by ${socket.id}`);
      callback({ success: true, message: `Room ${roomId} created successfully`, lobby: room });
    } catch (error) {
      console.log(error);
      callback({ success: false, message: 'Error occured while creating a room' });
    }
  });

  socket.on('joinRoom', async (data: roomRequest, callback: (response: roomResponse) => void) => {
    try {
      const { id, roomId } = data;

      if (!validateObjectId(id, callback)) return;

      const user = await User.findById(id);
      if (!userExists(user, callback)) return;

      user.socketId = socket.id;

      const room = await Room.findOne({ roomId });
      if (!roomExists(room, callback)) return;

      if (room.players.length >= room.maxPlayers) {
        callback({ success: false, message: 'Room is full' });
        return;
      }

      room.players.push(user._id);

      socket.join(roomId);

      await Promise.all([user.save(), room.save(), room.populate('players')]);

      socket.to(roomId).emit('playerJoined', {
        message: `Player ${id} joined the room`,
        lobby: room,
      });

      console.log(`User ${socket.id} joined room ${roomId}`);
      callback({ success: true, lobby: room });
    } catch (error) {
      console.log(error);
      callback({ success: false, message: 'Error occured while joining a room' });
    }
  });

  socket.on('leaveRoom', async (data: roomRequest, callback: (response: roomResponse) => void) => {
    try {
      const { id, roomId } = data;

      if (!validateObjectId(id, callback)) return;

      const user = await User.findById(id);
      if (!userExists(user, callback)) return;

      const room = await Room.findOne({ roomId });
      if (!roomExists(room, callback)) return;

      user.socketId = '';

      if (room.players.length === 1) {
        deleteRoom(user, roomId, callback);
        return;
      }

      room.players = room.players.filter((playerId) => {
        return playerId.toString() !== user._id.toString();
      });

      if (user.isHost) {
        user.isHost = false;

        const newHost = await User.findOne({ _id: { $in: room.players } });
        if (!newHost) {
          await deleteRoom(user, roomId, callback);
          return;
        }
        newHost.isHost = true;
        room.hostId = newHost._id;

        await newHost.save();
      }

      await Promise.all([user.save(), room.save(), room.populate('players')]);

      socket.leave(roomId);

      socket.to(roomId).emit('playerLeft', {
        message: `Player ${id} left the room`,
        lobby: room,
      });

      console.log(`User ${socket.id} left`);
      callback({ success: true, message: `You left the Room ${roomId}` });
    } catch (error) {
      console.log(error);
      callback({ success: false, message: 'Error occured while leaving the room' });
    }
  });

  socket.on('ready', async (data: roomRequest, callback: (response: roomResponse) => void) => {
    try {
      const { id, roomId } = data;

      if (!validateObjectId(id, callback)) return;

      const user = await User.findById(id);
      if (!userExists(user, callback)) return;

      user.isReady = true;

      await user.save();

      socket.to(roomId).emit('ready', {
        message: `Player ${id} is ready`,
        playerId: id,
      });

      console.log(`Player ${id} is ready`);
      callback({ success: true, message: `You are ready` });
    } catch (error) {
      console.log(error);
      callback({ success: false, message: 'Error occured' });
    }
  });

  socket.on('startGame', async (data: { roomId: string }, callback: (response: roomResponse) => void) => {
    try {
      const { roomId } = data;

      const room = await Room.findOne({ roomId });
      if (!roomExists(room, callback)) return;

      if (room.players.length < 6) {
        callback({ success: false, message: 'There are not enough players to start the game' });
        return;
      }

      room.numberOfMafia = Math.round(Math.sqrt(room.players.length) / 2);

      await room.populate('players');

      for (let i = 0; i < room.numberOfMafia; i++) {
        const player = room.players[Math.floor(Math.random() * room.players.length)];
        if ('role' in player) {
          player.role = 'mafia';
        }
      }

      io.to(roomId).emit('role', {
        message: `Your role`,
        players: room.players,
      });

      console.log(`Game ${roomId} started`);
      callback({ success: true, message: `Game started successfully` });
    } catch (error) {
      console.log(error);
      callback({ success: false, message: 'Error occured while starting the game' });
    }
  });
};
