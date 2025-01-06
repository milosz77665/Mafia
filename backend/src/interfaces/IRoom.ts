import { Document, Model, ObjectId } from 'mongoose';
import { IUserDocument } from './IUser';

export interface IRoomDocument extends Document {
  roomId: string;
  hostId: ObjectId;
  players: (ObjectId | IUserDocument)[];
  maxPlayers: number;
  numberOfMafia: number;
  createdAt: Date;
  logs: string[];
}

export interface IRoomModel extends Model<IRoomDocument> {
  generateUniqueRoomId: () => Promise<string>;
  roomExists: (roomId: string) => Promise<boolean>;
}
