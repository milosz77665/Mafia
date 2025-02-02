import { IUser } from './IUser';

export interface ILobby {
  _id: string;
  roomId: string;
  hostId: string;
  players: IUser[];
  maxPlayers: number;
  numberOfMafia: number;
  isGameStarted: boolean;
  createdAt: Date;
  logs: string[];
}
