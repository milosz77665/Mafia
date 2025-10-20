import { Socket } from 'socket.io';
import { IRoomResponse, IRoomRequest } from '../../../interfaces/IRoomSocket';
import { getRoomById, getUserById, leaveRoom } from '../../../utils/socketHelpers';

export const onLeaveRoom = (socket: Socket) => {
  socket.on('leaveRoom', async (data: IRoomRequest, callback: (response: IRoomResponse) => void) => {
    try {
      const { id, roomId } = data;
      const user = await getUserById(id, callback);
      if (!user) return;
      const room = await getRoomById(roomId, callback);
      if (!room) return;

      await leaveRoom(socket, room, user);

      socket.to(room.roomId).emit('playerLeft', {
        message: `Player ${user._id} left the room`,
        players: room.players,
      });

      console.log(`User ${user._id} left the room`);
      callback({ success: true, message: `You left the room ${roomId}` });
    } catch (error) {
      console.log(error);
      callback({ success: false, message: 'Error occured while leaving the room' });
    }
  });
};
