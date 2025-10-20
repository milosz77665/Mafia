import { Server, Socket } from 'socket.io';
import { onCreateRoom } from './createRoom';
import { onJoinRoom } from './joinRoom';
import { onLeaveRoom } from './leaveRoom';
import { onReady } from './ready';
import { onDisconnect, onReconnect } from './connect';
import { onStartGame } from './startGame';

export const roomService = (socket: Socket, io: Server) => {
  onCreateRoom(socket);
  onJoinRoom(socket);
  onLeaveRoom(socket);
  onReady(socket, io);
  onStartGame(socket, io);
  onDisconnect(socket);
  onReconnect(socket);
};
