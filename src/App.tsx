import { useEffect, useState } from 'react';

import Header from 'components/Header';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { changeName, selectName } from 'store/slices/settings';
import {
  useGetPopularMoviesQuery,
  useGetPopularSeriesQuery,
  useLazyGetSearchMoviesQuery,
  useLazyGetSearchSeriesQuery,
} from 'store/apis/tmdb';

export default function App() {
  const dispatch = useAppDispatch();
  const [literal, setLiteral] = useState('');
  const [name, setName] = useState('');
  const [queryMovies, setQueryMovies] = useState('');
  const [querySeries, setQuerySeries] = useState('');

  const nameFromRedux = useAppSelector(selectName);

  const {
    data: moviesData,
    error: moviesError,
    isLoading: moviesIsLoading,
  } = useGetPopularMoviesQuery();
  const {
    data: seriesData,
    error: seriesError,
    isLoading: seriesIsLoading,
  } = useGetPopularSeriesQuery();
  const [
    triggerSearchMovies,
    {
      data: searchMoviesData,
      error: searchMoviesError,
      isLoading: searchMoviesIsLoading,
    },
  ] = useLazyGetSearchMoviesQuery();
  const [
    triggerSearchSeries,
    {
      data: searchSeriesData,
      error: searchSeriesError,
      isLoading: searchSeriesIsLoading,
    },
  ] = useLazyGetSearchSeriesQuery();

  useEffect(() => {
    if (literal !== '') return;
    setLiteral('hello there');
    dispatch(changeName('obi wan'));
  }, []);

  useEffect(() => {
    setName(nameFromRedux);
  }, [literal]);

  const handleInputSearch = (inputQuery: string, media_type: string) => {
    if (media_type === 'movie') {
      setQueryMovies(inputQuery);
      triggerSearchMovies(inputQuery);
    }
    if (media_type === 'tv') {
      setQuerySeries(inputQuery);
      triggerSearchSeries(inputQuery);
    }
  };

  return (
    <div>
      <Header title={literal} />
      <Header title={name} />
      <h1>MOVIES</h1>
      {moviesError ? (
        <>Oh no, there was an error</>
      ) : moviesIsLoading ? (
        <>Loading...</>
      ) : moviesData?.results ? (
        <>
          {moviesData.results.map((movie, index) => (
            <h4 key={index}>{movie.original_title}</h4>
          ))}
        </>
      ) : null}
      <h1>SERIES</h1>
      {seriesError ? (
        <>Oh no, there was an error</>
      ) : seriesIsLoading ? (
        <>Loading...</>
      ) : seriesData?.results ? (
        <>
          {seriesData.results.map((serie, index) => (
            <h4 key={index}>{serie.name}</h4>
          ))}
        </>
      ) : null}
      <h1>SEARCH MOVIES</h1>
      <input
        type="text"
        value={queryMovies}
        onChange={e => handleInputSearch(e.target.value, 'movie')}
      />
      {searchMoviesError ? (
        <>Oh no, there was an error</>
      ) : searchMoviesIsLoading ? (
        <>Loading...</>
      ) : searchMoviesData?.results ? (
        <>
          {searchMoviesData.results.map((movie, index) => (
            <h4 key={index}>{movie.original_title}</h4>
          ))}
        </>
      ) : null}
      <h1>SEARCH SERIES</h1>
      <input
        type="text"
        value={querySeries}
        onChange={e => handleInputSearch(e.target.value, 'tv')}
      />
      {searchSeriesError ? (
        <>Oh no, there was an error</>
      ) : searchSeriesIsLoading ? (
        <>Loading...</>
      ) : searchSeriesData?.results ? (
        <>
          {searchSeriesData.results.map((serie, index) => (
            <h4 key={index}>{serie.name}</h4>
          ))}
        </>
      ) : null}
    </div>
  );
}
