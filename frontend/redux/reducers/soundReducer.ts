import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface soundState {
  musicVolume: number;
}

const soundInitialState: soundState = {
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
