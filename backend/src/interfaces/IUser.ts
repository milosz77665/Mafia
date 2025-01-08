import { Document, Types } from 'mongoose';

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  socketId: string;
  createdAt: Date;
  nickname: string;
  avatarUrl: string;
  isReady: boolean;
  isHost: boolean;
  role: 'mafia' | 'citizen' | 'none';
}
