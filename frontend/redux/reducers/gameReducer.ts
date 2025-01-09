import { ILobby } from '@/interfaces/ILobby';
import { IUser } from '@/interfaces/IUser';
import { isUserObject } from '@/utils/typeGuards';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  lobby: ILobby | null;
}

const gameInitialState: GameState = {
  lobby: null,
};

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState: gameInitialState,
  reducers: {
    setLobby(state, action: PayloadAction<ILobby>) {
      state.lobby = action.payload;
    },
    addPlayer(state, action: PayloadAction<IUser>) {
      if (state.lobby) {
        state.lobby.players.push(action.payload);
      }
    },
    updatePlayers(state, action: PayloadAction<IUser[]>) {
      if (state.lobby) {
        state.lobby.players = action.payload;
      }
    },
    updateIsReady(state, action: PayloadAction<string>) {
      if (state.lobby) {
        state.lobby.players = state.lobby.players.map((player) => {
          if (isUserObject(player) && player._id === action.payload) {
            return { ...player, isReady: !player.isReady };
          } else {
            return player;
          }
        });
      }
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
