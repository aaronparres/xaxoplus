import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MoviesResponse, SeriesResponse, MovieResult, TvResult } from 'models/tmdb.model';

const API_KEY = process.env.REACT_APP_API_KEY;

const COMMON_QUERY_PARAMS = {
  api_key: API_KEY,
  language: 'en-US',
  page: 1,
};

// Define a service using a base URL and expected endpoints
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
  }),
  endpoints: builder => ({
    getPopularMovies: builder.query<MoviesResponse, void>({
      query: () => ({
        url: `movie/popular`,
        params: {
          ...COMMON_QUERY_PARAMS,
        },
      }),
    }),
    getPopularSeries: builder.query<SeriesResponse, void>({
      query: () => ({
        url: `tv/popular`,
        params: {
          ...COMMON_QUERY_PARAMS,
        },
      }),
    }),
    getSearchMovies: builder.query<MoviesResponse, string>({
      query: (query: string) => ({
        url: `search/movie`,
        params: {
          ...COMMON_QUERY_PARAMS,
          query,
        },
      }),
    }),
    getSearchSeries: builder.query<SeriesResponse, string>({
      query: (query: string) => ({
        url: `search/tv`,
        params: {
          ...COMMON_QUERY_PARAMS,
          query,
        },
      }),
    }),
    getInfoMovie: builder.query<MovieResult, string>({
      query: (id: string) => ({
        url: `movie/${id}`,
        params: {
          ...COMMON_QUERY_PARAMS,
        },
      }),
    }),
    getInfoSerie: builder.query<TvResult, string>({
      query: (id: string) => ({
        url: `tv/${id}`,
        params: {
          ...COMMON_QUERY_PARAMS,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPopularMoviesQuery,
  useGetPopularSeriesQuery,
  useLazyGetSearchMoviesQuery,
  useLazyGetSearchSeriesQuery,
  useLazyGetInfoMovieQuery,
  useLazyGetInfoSerieQuery,
} = tmdbApi;
