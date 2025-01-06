import { Document, ObjectId } from 'mongoose';

export interface IUserDocument extends Document {
  _id: ObjectId;
  socketId: string;
  createdAt: Date;
  nickname: string;
  avatarUrl: string;
  isReady: boolean;
  isHost: boolean;
  role: 'mafia' | 'citizen' | 'none';
}
