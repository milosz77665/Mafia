import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SoundState {
  musicVolume: number;
}

const soundInitialState: SoundState = {
  musicVolume: 1.0,
};

const soundSlice = createSlice({
  name: 'soundSlice',
  initialState: soundInitialState,
  reducers: {
    changeMusicVolume(state, action: PayloadAction<number>) {
      state.musicVolume = action.payload;
    },
  },
});

export const soundActions = soundSlice.actions;

export default soundSlice.reducer;
