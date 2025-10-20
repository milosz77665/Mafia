import { Socket } from 'socket.io';
import { Room } from '../../../models/Room';
import { IRoomCreateRequest, IRoomResponse } from '../../../interfaces/IRoomSocket';
import { getUserById } from '../../../utils/socketHelpers';

export const onCreateRoom = (socket: Socket) => {
  socket.on('createRoom', async (data: IRoomCreateRequest, callback: (response: IRoomResponse) => void) => {
    try {
      const { id, maxPlayers } = data;
      const user = await getUserById(id, callback);
      if (!user) return;

      if (maxPlayers < 6 || maxPlayers > 20) {
        callback({ success: false, message: 'Invalid number of players. Must be between 6 and 20' });
        return;
      }

      user.isHost = true;
      user.socketId = socket.id;
      await user.save();

      const roomId = await Room.generateUniqueRoomId();
      const room = new Room({ roomId, hostId: user._id, players: [user._id], maxPlayers });

      socket.join(roomId);

      await Promise.all([room.save(), room.populate('players')]);

      console.log(`Room ${roomId} created by ${id}`);
      callback({ success: true, message: `Room ${roomId} created successfully`, lobby: room });
    } catch (error) {
      console.log(error);
      callback({ success: false, message: 'Error occured while creating a room' });
    }
  });
};
