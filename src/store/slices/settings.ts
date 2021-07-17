import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store/createStore';

interface settingsState {
  name: string;
}

const initialState: settingsState = {
  name: '',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const selectName = (state: RootState): string => state.settings.name;

export const { changeName } = settingsSlice.actions;

export default settingsSlice.reducer;
