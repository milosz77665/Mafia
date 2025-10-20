import { Server, Socket } from 'socket.io';
import { IRoomResponse, IRoomRequest } from '../../../interfaces/IRoomSocket';
import { getUserById } from '../../../utils/socketHelpers';

export const onReady = (socket: Socket, io: Server) => {
  socket.on('ready', async (data: IRoomRequest, callback: (response: IRoomResponse) => void) => {
    try {
      const { id, roomId } = data;
      const user = await getUserById(id, callback);
      if (!user) return;

      user.isReady = !user.isReady;
      await user.save();

      io.to(roomId).emit('playerReady', {
        message: user.isReady ? `Player ${id} is ready` : `Player ${id} is not ready`,
        id: user._id,
        isReady: user.isReady,
      });

      console.log(user.isReady ? `Player ${id} is ready` : `Player ${id} is not ready`);
      callback({ success: true, message: user.isReady ? `You are ready` : `You are not ready` });
    } catch (error) {
      console.log(error);
      callback({ success: false, message: 'Error occured' });
    }
  });
};
