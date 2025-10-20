import { Socket } from 'socket.io';
import { IRoomRequest, IRoomResponse } from '../../../interfaces/IRoomSocket';
import { getRoomById, getUserById } from '../../../utils/socketHelpers';

export const onJoinRoom = (socket: Socket) => {
  socket.on('joinRoom', async (data: IRoomRequest, callback: (response: IRoomResponse) => void) => {
    try {
      const { id, roomId } = data;
      const user = await getUserById(id, callback);
      if (!user) return;
      const room = await getRoomById(roomId, callback);
      if (!room) return;

      if (room.players.length >= room.maxPlayers) {
        callback({ success: false, message: "You can't join. Room is full" });
        return;
      }

      if (room.isGameStarted) {
        callback({ success: false, message: "You can't join. Game was started" });
        return;
      }

      user.socketId = socket.id;
      room.players.push(user._id);
      socket.join(roomId);
      await Promise.all([user.save(), room.save(), room.populate('players')]);

      socket.to(roomId).emit('playerJoined', {
        message: `Player ${id} joined the room`,
        player: user,
      });

      console.log(`User ${id} joined the room ${roomId}`);
      callback({ success: true, message: `You joined to the room ${roomId}`, lobby: room });
    } catch (error) {
      console.log(error);
      callback({ success: false, message: 'Error occured while joining a room' });
    }
  });
};
