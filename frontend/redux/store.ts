import { configureStore } from '@reduxjs/toolkit';
import soundReducer from './reducers/soundReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({ reducer: { sound: soundReducer, user: userReducer } });

export type RootState = ReturnType<typeof store.getState>;

export default store;
