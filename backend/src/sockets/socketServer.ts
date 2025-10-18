import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
import { roomService } from './services/room/roomService';

export class SocketServer {
  private static instance: SocketServer;
  private io: Server;

  private constructor(server: HTTPServer) {
    this.io = new Server(server, {
      connectionStateRecovery: {
        maxDisconnectionDuration: 15000,
      },
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    this.io.on('connect', this.StartListeners);
  }

  public static getInstance = (server: HTTPServer) => {
    if (!SocketServer.instance) {
      SocketServer.instance = new SocketServer(server);
    }
    return SocketServer.instance;
  };

  private StartListeners = (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);
    roomService(socket, this.io);
  };
}
