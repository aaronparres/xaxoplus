import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovieResult, TvResult } from 'models/tmdb.model';
import type { RootState } from 'store/createStore';

interface settingsState {
  mediaType: string;
  previousSearchMovies: MovieResult[];
  previousSearchSeries: TvResult[];
}

const initialState: settingsState = {
  mediaType: 'movie',
  previousSearchMovies: [],
  previousSearchSeries: [],
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    changeMediaType: (state, action: PayloadAction<string>) => {
      state.mediaType = action.payload;
    },
    saveToPreviousSearchMovies: (state, action: PayloadAction<{ data: MovieResult }>) => {
      const isAlreadySaved = state.previousSearchMovies.some(
        movie => movie.id === action.payload.data.id,
      );
      if (isAlreadySaved) return;
      if (state.previousSearchMovies.length > 4) state.previousSearchMovies.shift();
      state.previousSearchMovies.push(action.payload.data);
    },
    saveToPreviousSearchSeries: (state, action: PayloadAction<{ data: TvResult }>) => {
      const isAlreadySaved = state.previousSearchSeries.some(
        serie => serie.id === action.payload.data.id,
      );
      if (isAlreadySaved) return;
      if (state.previousSearchSeries.length > 4) state.previousSearchSeries.shift();
      state.previousSearchSeries.push(action.payload.data);
    },
  },
});

// SELECTORS
export const selectSwitchMediaType = (state: RootState): string =>
  state.settings.mediaType;

export const selectPreviousSearchElements = (state: RootState) => ({
  movies: state.settings.previousSearchMovies,
  series: state.settings.previousSearchSeries,
});

// ACTIONS
export const { changeMediaType, saveToPreviousSearchMovies, saveToPreviousSearchSeries } =
  settingsSlice.actions;

export default settingsSlice.reducer;
