import { IUser } from '@/interfaces/IUser';

export const isUserObject = (player: string | IUser): player is IUser => {
  return (player as IUser)._id !== undefined;
};
