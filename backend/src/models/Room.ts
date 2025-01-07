import { model, Schema, SchemaTypes } from 'mongoose';
import { IRoomDocument, IRoomModel } from '../interfaces/IRoom';
const RoomSchema = new Schema<IRoomDocument, IRoomModel>({
  roomId: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  hostId: { type: SchemaTypes.ObjectId, ref: 'User', required: true, unique: true },
  players: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
  maxPlayers: { type: Number, min: 6 },
  numberOfMafia: Number,
  isGameStarted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  logs: { type: [String], default: [] },
});

const generateRoomId = (): string => {
  const characters = '0123456789';
  // ABCDEFGHIJKLMNOPQRSTUVWXYZ
  let roomId = '';
  for (let i = 0; i < 5; i++) {
    roomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return roomId;
};

RoomSchema.statics.roomExists = async function (roomId: string): Promise<boolean> {
  return (await this.exists({ roomId })) !== null;
};

RoomSchema.statics.generateUniqueRoomId = async function (): Promise<string> {
  let roomId: string;
  let exists: boolean;

  do {
    roomId = generateRoomId();
    exists = await this.roomExists(roomId);
  } while (exists);

  return roomId;
};

export const Room = model<IRoomDocument, IRoomModel>('Room', RoomSchema);
