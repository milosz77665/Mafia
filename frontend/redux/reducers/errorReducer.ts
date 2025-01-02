import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorData {
  title: string;
  message: string;
}

interface ErrorState {
  errors: ErrorData[];
}

const errorInitialState: ErrorState = {
  errors: [],
};

const errorSlice = createSlice({
  name: 'errorSlice',
  initialState: errorInitialState,
  reducers: {
    showError(state, action: PayloadAction<ErrorData>) {
      state.errors.push(action.payload);
    },
    removeFirst(state) {
      state.errors.shift();
    },
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice.reducer;
