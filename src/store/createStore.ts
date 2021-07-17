import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from './apis/tmdb';
import settingsSlice from './slices/settings';

const rootReducer = combineReducers({
  settings: settingsSlice,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tmdbApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
