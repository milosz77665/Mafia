import { Server, Socket } from 'socket.io';
import { IRoomResponse } from '../../../interfaces/IRoomSocket';
import { allPlayersReady, assignRoles, getRoomById } from '../../../utils/socketHelpers';

export const onStartGame = (socket: Socket, io: Server) => {
  socket.on('startGame', async (data: { roomId: string }, callback: (response: IRoomResponse) => void) => {
    try {
      const { roomId } = data;
      const room = await getRoomById(roomId, callback);
      if (!room) return;

      if (room.players.length < 6) {
        callback({ success: false, message: 'There are not enough players to start the game' });
        return;
      }

      await room.populate('players');
      if (!allPlayersReady(room)) {
        callback({ success: false, message: 'All players must be ready to start the game' });
        return;
      }

      room.numberOfMafia = Math.round(Math.sqrt(room.players.length) / 2);
      await assignRoles(room);
      if (!room.isGameStarted) {
        room.isGameStarted = true;
      }
      await room.save();

      io.to(roomId).emit('rolesAssigned', {
        message: `Roles assigned`,
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
