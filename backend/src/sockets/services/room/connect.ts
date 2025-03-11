import { Socket } from 'socket.io';
import { Room } from '../../../models/Room';
import { User } from '../../../models/User';
import { getUserById, leaveRoom } from '../../../utils/socketHelpers';
import { IRoomResponse } from '../../../interfaces/IRoomSocket';

const disconnectTimers: Map<string, NodeJS.Timeout> = new Map();

export const onDisconnect = (socket: Socket) => {
  socket.on('disconnect', async () => {
    try {
      const user = await User.findOne({ socketId: socket.id });
      if (!user) return;

      const timer = setTimeout(async () => {
        const room = await Room.findOne({ players: user._id });
        if (!room) return;
        await leaveRoom(socket, room, user);

        socket.to(room.roomId).emit('playerLeft', {
          message: `Player ${user._id} disconnected`,
          players: room.players,
        });
        socket.disconnect(true);
      }, 15000);
      disconnectTimers.set(user._id.toString(), timer);

      console.log(`User ${user._id.toString()} disconnected`);
    } catch (error) {
      console.error('Error during disconnection: ', error);
    }
  });
};

export const onReconnect = (socket: Socket) => {
  socket.on('reconnect', async (data: { id: string }, callback: (response: IRoomResponse) => void) => {
    try {
      const { id } = data;
      const user = await getUserById(id, callback);
      if (!user) return;

      if (disconnectTimers.has(user._id.toString())) {
        clearTimeout(disconnectTimers.get(user._id.toString())!);
        disconnectTimers.delete(user._id.toString());
        user.socketId = socket.id;
        await user.save();
      }
      console.log(`User ${id} reconnected`);
    } catch (error) {
      console.error('Error during reconnection: ', error);
    }
  });
};
