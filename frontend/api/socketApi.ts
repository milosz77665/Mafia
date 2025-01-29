import { getFromStorage } from '@/storage/storageHandler';
import { Manager, Socket } from 'socket.io-client';

class SocketApi {
  private static instance: SocketApi;
  private socket: Socket | null = null;
  private url: string | undefined;

  private constructor(url: string | undefined) {
    this.url = url;
  }

  public static getInstance(url: string | undefined) {
    if (!SocketApi.instance) {
      SocketApi.instance = new SocketApi(url);
    }
    return SocketApi.instance;
  }

  public connect() {
    if (!this.socket) {
      const manager = new Manager(this.url, {
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 7,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 2400,
      });

      this.socket = manager.socket('/');
    }

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.io.on('reconnect', async () => {
      const id = await getFromStorage('id');
      console.log('Reconnecting');
      this.socket?.emit('reconnect', { id });
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public onReconnectFailed(callback: () => void) {
    if (this.socket) {
      this.socket.io.on('reconnect_failed', () => {
        console.log('Reconnecting failed');
        callback();
        this.disconnect();
      });
    } else {
      console.error('Socket is not connected');
    }
  }

  public offReconnectFailed() {
    if (this.socket) {
      this.socket.io.off('reconnect_failed');
    } else {
      console.error('Socket is not connected');
    }
  }

  public emit(event: string, data: any, callback?: (response: any) => void) {
    if (this.socket) {
      this.socket.emit(event, data, (response: any) => {
        if (callback) {
          callback(response);
        }
      });
    } else {
      console.error('Socket is not connected');
    }
  }

  public on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      console.error('Socket is not connected');
    }
  }

  public off(event: string, callback?: (data: any) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    } else {
      console.error('Socket is not connected');
    }
  }
}

const socketApi = SocketApi.getInstance(process.env.EXPO_PUBLIC_API_URL);
export default socketApi;
