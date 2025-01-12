import { configureStore } from '@reduxjs/toolkit';
import soundReducer from './reducers/soundReducer';
import userReducer from './reducers/userReducer';
import errorReducer from './reducers/errorReducer';
import gameReducer from './reducers/gameReducer';

const store = configureStore({
  reducer: { sound: soundReducer, user: userReducer, error: errorReducer, game: gameReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
