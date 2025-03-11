import { Room } from '../models/Room';
import { User } from '../models/User';
import { IRoomDocument } from '../interfaces/IRoom';
import { IUserDocument } from '../interfaces/IUser';
import { IRoomResponse } from '../interfaces/IRoomSocket';
import { ObjectId } from 'mongodb';
import { isIUserDocument } from './typeGuards';
import { Socket } from 'socket.io';

export const getUserById = async (id: string, callback: (response: IRoomResponse) => void) => {
  if (!validateObjectId(id, callback)) return false;

  const user = await User.findById(id);
  if (!userExists(user, callback)) return false;

  return user;
};

export const getRoomById = async (roomId: string, callback: (response: IRoomResponse) => void) => {
  const room = await Room.findOne({ roomId });
  if (!roomExists(room, callback)) return false;

  return room;
};

export const validateObjectId = (id: string, callback: (response: IRoomResponse) => void) => {
  if (!ObjectId.isValid(id)) {
    callback({ success: false, message: 'Invalid user ID' });
    return false;
  }
  return true;
};

export const userExists = (
  user: IUserDocument | null,
  callback: (response: IRoomResponse) => void
): user is IUserDocument => {
  if (!user) {
    callback({ success: false, message: 'User does not exist' });
    return false;
  }
  return true;
};

export const roomExists = (
  room: IRoomDocument | null,
  callback: (response: IRoomResponse) => void
): room is IRoomDocument => {
  if (!room) {
    callback({ success: false, message: 'Room does not exist' });
    return false;
  }
  return true;
};

export const allPlayersReady = (room: IRoomDocument) => {
  return room.players.every((player) => isIUserDocument(player) && (player.isReady || player.isHost));
};

export const deleteRoom = async (roomId: string, callback?: (response: IRoomResponse) => void) => {
  await Room.deleteOne({ roomId });

  console.log(`Room deleted: ${roomId}`);
  if (callback) {
    callback({ success: true, message: `Room ${roomId} was deleted` });
  }
};

export const assignRoles = async (room: IRoomDocument) => {
  for (let i = 0; i < room.numberOfMafia; i++) {
    const player = room.players[Math.floor(Math.random() * room.players.length)];
    if ('role' in player && player.role !== 'mafia') {
      player.role = 'mafia';
      await player.save();
    }
  }

  room.players.forEach(async (player) => {
    if ('role' in player && player.role === 'none') {
      player.role = 'citizen';
      await player.save();
    }
  });
};

export const leaveRoom = async (socket: Socket, room: IRoomDocument, user: IUserDocument) => {
  room.players = room.players.filter((playerId) => {
    return playerId.toString() !== user._id.toString();
  });

  if (room.players.length === 0) {
    await setUserToDefault(user);
    await deleteRoom(room.roomId);
    return false;
  }

  if (user.isHost) {
    const newHost = await getNewHost(room);
    if (!newHost) {
      await setUserToDefault(user);
      await deleteRoom(room.roomId);
      return false;
    }
    room.hostId = newHost._id;
  }
  await Promise.all([room.save(), room.populate('players'), setUserToDefault(user)]);
};

export const getNewHost = async (room: IRoomDocument) => {
  const newHost = await User.findOne({ _id: { $in: room.players } });
  if (!newHost) return false;
  newHost.isHost = true;
  newHost.isReady = false;
  await newHost.save();

  return newHost;
};

export const setUserToDefault = async (user: IUserDocument) => {
  user.isHost = false;
  user.isReady = false;
  user.role = 'none';
  user.socketId = '';
  await user.save();
};
