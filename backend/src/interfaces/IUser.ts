import { Document, ObjectId } from 'mongoose';

export interface IUserDocument extends Document {
  _id: ObjectId;
  socketId: string;
  createdAt: Date;
  nickname: string;
  avatarUrl: string;
  role: 'mafia' | 'citizen' | 'none';
}
