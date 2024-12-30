import { model, Schema } from 'mongoose';
import { IUserDocument } from '../interfaces/IUser';

export const UserSchema = new Schema<IUserDocument>({
  socketId: { type: String, unique: true, default: '' },
  createdAt: { type: Date, default: Date.now },
  nickname: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  role: {
    type: String,
    required: true,
    enum: ['mafia', 'citizen', 'none'],
    default: 'none',
  },
});

export const User = model<IUserDocument>('User', UserSchema);
