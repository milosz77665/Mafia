import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  nickname: string;
  id: string;
  didNicknameChanged: boolean;
}

const userInitialState: userState = {
  nickname: 'SillyGoose17',
  id: '',
  didNicknameChanged: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: userInitialState,
  reducers: {
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
      state.didNicknameChanged = true;
    },
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    resetDidNicknameChange(state) {
      state.didNicknameChanged = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
