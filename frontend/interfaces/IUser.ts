export interface IUser {
  _id: string;
  socketId: string;
  createdAt: Date;
  nickname: string;
  avatarUrl: string;
  isReady: boolean;
  isHost: boolean;
  role: 'mafia' | 'citizen' | 'none';
}
