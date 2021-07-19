import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store/createStore';

interface settingsState {
  mediaType: string;
}

const initialState: settingsState = {
  mediaType: 'movie',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    changeMediaType: (state, action: PayloadAction<string>) => {
      state.mediaType = action.payload;
    },
  },
});

// SELECTORS
export const selectSwitchMediaType = (state: RootState): string =>
  state.settings.mediaType;

// ACTIONS
export const { changeMediaType } = settingsSlice.actions;

export default settingsSlice.reducer;
