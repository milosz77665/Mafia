import { configureStore } from '@reduxjs/toolkit';
import soundReducer from './reducers/soundReducer';
import userReducer from './reducers/userReducer';
import errorReducer from './reducers/errorReducer';

const store = configureStore({ reducer: { sound: soundReducer, user: userReducer, error: errorReducer } });

export type RootState = ReturnType<typeof store.getState>;

export default store;
