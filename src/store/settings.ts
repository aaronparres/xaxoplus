import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store/createStore';

// Define the initial state using that type
const initialState = {};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {},
});

// export const {

// } = settingsSlice.actions;

export default settingsSlice.reducer;
