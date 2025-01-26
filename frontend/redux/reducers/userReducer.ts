import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  nickname: string;
  id: string;
  avatar: string;
  isAvatarChanged: boolean;
  isNicknameChanged: boolean;
}

const userInitialState: UserState = {
  nickname: 'SillyGoose17',
  id: '',
  avatar: '',
  isAvatarChanged: false,
  isNicknameChanged: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: userInitialState,
  reducers: {
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
      state.isNicknameChanged = true;
    },
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setAvatar(state, action: PayloadAction<string>) {
      state.avatar = action.payload;
      state.isAvatarChanged = true;
    },
    resetIsAvatarChanged(state) {
      state.isAvatarChanged = false;
    },
    resetIsNicknameChanged(state) {
      state.isNicknameChanged = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
