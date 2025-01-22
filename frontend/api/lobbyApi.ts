import { ILobby } from '@/interfaces/ILobby';
import socketApi from './socketApi';
import { IUser } from '@/interfaces/IUser';

export interface lobbyResponse {
  success: boolean;
  message: string;
  lobby?: ILobby;
}

export const createLobby = (id: string, maxPlayers: number): Promise<lobbyResponse> => {
  return new Promise((resolve, reject) => {
    socketApi.emit('createRoom', { id, maxPlayers }, (response: lobbyResponse) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
};

export const joinLobby = (id: string, gameId: string): Promise<lobbyResponse> => {
  return new Promise((resolve, reject) => {
    socketApi.emit('joinRoom', { id, roomId: gameId }, (response: lobbyResponse) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
};

export const leaveLobby = (id: string, gameId: string): Promise<lobbyResponse> => {
  return new Promise((resolve, reject) => {
    socketApi.emit('leaveRoom', { id, roomId: gameId }, (response: lobbyResponse) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
};

export const ready = (id: string, gameId: string): Promise<lobbyResponse> => {
  return new Promise((resolve, reject) => {
    socketApi.emit('ready', { id, roomId: gameId }, (response: lobbyResponse) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
};

export const notReady = (id: string, gameId: string): Promise<lobbyResponse> => {
  return new Promise((resolve, reject) => {
    socketApi.emit('notReady', { id, roomId: gameId }, (response: lobbyResponse) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
};

export const startGame = (gameId: string): Promise<lobbyResponse> => {
  return new Promise((resolve, reject) => {
    socketApi.emit('startGame', { roomId: gameId }, (response: lobbyResponse) => {
      if (response.success) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
};

export const onPlayerJoined = (callback: (data: { player: IUser }) => void) => {
  socketApi.on('playerJoined', callback);
};

export const onPlayerLeft = (callback: (data: { players: IUser[] }) => void) => {
  socketApi.on('playerLeft', callback);
};

export const onPlayerReady = (callback: (data: { id: string; isReady: boolean }) => void) => {
  socketApi.on('playerReady', callback);
};

export const onRolesAssigned = (callback: (data: { players: IUser[] }) => void) => {
  socketApi.on('rolesAssigned', callback);
};

export const offPlayerJoined = () => {
  socketApi.off('playerJoined');
};

export const offPlayerLeft = () => {
  socketApi.off('playerLeft');
};

export const offPlayerReady = () => {
  socketApi.off('playerReady');
};

export const offRolesAssigned = () => {
  socketApi.off('rolesAssigned');
};
