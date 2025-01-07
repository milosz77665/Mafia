import { Document, Model, Types } from 'mongoose';
import { IUserDocument } from './IUser';

export interface IRoomDocument extends Document {
  roomId: string;
  hostId: Types.ObjectId;
  players: (Types.ObjectId | IUserDocument)[];
  maxPlayers: number;
  numberOfMafia: number;
  createdAt: Date;
  logs: string[];
}

export interface IRoomModel extends Model<IRoomDocument> {
  generateUniqueRoomId: () => Promise<string>;
  roomExists: (roomId: string) => Promise<boolean>;
}
