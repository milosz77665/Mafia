import { IRoomDocument } from './IRoom';

export interface IRoomCreateRequest {
  id: string;
  maxPlayers: number;
}

export interface IRoomRequest {
  id: string;
  roomId: string;
}

export interface IRoomResponse {
  success: boolean;
  message?: string;
  lobby?: IRoomDocument;
}
