import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  nickname: string;
}

const userInitialState: userState = {
  nickname: 'SillyGoose17',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: userInitialState,
  reducers: {
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
