import { IUserDocument } from '../interfaces/IUser';
import { Types } from 'mongoose';

export const isIUserDocument = (player: IUserDocument | Types.ObjectId): player is IUserDocument => {
  return (player as IUserDocument).isReady !== undefined;
};
