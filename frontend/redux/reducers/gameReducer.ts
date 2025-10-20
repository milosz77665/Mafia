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
      const numberOfMafia = Math.round(Math.sqrt(action.payload.players.length) / 2);
      state.lobby = { ...action.payload, numberOfMafia };
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
    updateIsReady(state, action: PayloadAction<{ id: string; isReady: boolean }>) {
      if (state.lobby) {
        state.lobby.players = state.lobby.players.map((player) => {
          if (isUserObject(player) && player._id === action.payload.id) {
            return { ...player, isReady: action.payload.isReady };
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
