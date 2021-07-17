import { useEffect, useState } from 'react';

import Header from 'components/Header';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { changeName, selectName } from 'store/slices/settings';
import { useGetPopularMoviesQuery, useGetPopularSeriesQuery } from 'store/apis/tmdb';

export default function App() {
  const [literal, setLiteral] = useState('');
  const [name, setName] = useState('');
  const nameFromRedux = useAppSelector(selectName);
  const dispatch = useAppDispatch();

  const getMoviesQuery = useGetPopularMoviesQuery();
  const getSeriesQuery = useGetPopularSeriesQuery();

  useEffect(() => {
    if (literal !== '') return;
    setLiteral('hello there');
    dispatch(changeName('obi wan'));
  }, []);

  useEffect(() => {
    setName(nameFromRedux);
  }, [literal]);

  return (
    <div>
      <Header title={literal} />
      <Header title={name} />
      <h1>MOVIES</h1>
      {getMoviesQuery.error ? (
        <>Oh no, there was an error</>
      ) : getMoviesQuery.isLoading ? (
        <>Loading...</>
      ) : getMoviesQuery.data?.results ? (
        <>
          {getMoviesQuery.data.results.map((movie, index) => (
            <h4 key={index}>{movie.original_title}</h4>
          ))}
        </>
      ) : null}
      <h1>SERIES</h1>
      {getSeriesQuery.error ? (
        <>Oh no, there was an error</>
      ) : getSeriesQuery.isLoading ? (
        <>Loading...</>
      ) : getSeriesQuery.data?.results ? (
        <>
          {getSeriesQuery.data.results.map((serie, index) => (
            <h4 key={index}>{serie.name}</h4>
          ))}
        </>
      ) : null}
    </div>
  );
}
