import { configureStore } from '@reduxjs/toolkit';
import soundReducer from './reducers/soundReducer';

const store = configureStore({ reducer: { sound: soundReducer } });

export type RootState = ReturnType<typeof store.getState>;

export default store;
