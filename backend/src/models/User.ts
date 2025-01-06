import { model, Schema } from 'mongoose';
import { IUserDocument } from '../interfaces/IUser';

export const UserSchema = new Schema<IUserDocument>({
  socketId: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  nickname: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  isReady: { type: Boolean, default: false },
  isHost: { type: Boolean, default: false },
  role: {
    type: String,
    required: true,
    enum: ['mafia', 'citizen', 'none'],
    default: 'none',
  },
});

export const User = model<IUserDocument>('User', UserSchema);
