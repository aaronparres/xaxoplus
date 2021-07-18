import { useEffect, useState } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import PopularContent from 'components/PopularContent';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  useGetPopularMoviesQuery,
  useGetPopularSeriesQuery,
  useLazyGetSearchMoviesQuery,
  useLazyGetSearchSeriesQuery,
} from 'store/apis/tmdb';

export default function App() {
  const dispatch = useAppDispatch();

  // const [queryMovies, setQueryMovies] = useState('');
  // const [querySeries, setQuerySeries] = useState('');

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
  // const [
  //   triggerSearchMovies,
  //   {
  //     data: searchMoviesData,
  //     error: searchMoviesError,
  //     isLoading: searchMoviesIsLoading,
  //   },
  // ] = useLazyGetSearchMoviesQuery();
  // const [
  //   triggerSearchSeries,
  //   {
  //     data: searchSeriesData,
  //     error: searchSeriesError,
  //     isLoading: searchSeriesIsLoading,
  //   },
  // ] = useLazyGetSearchSeriesQuery();

  // const handleInputSearch = (inputQuery: string, media_type: string) => {
  //   if (media_type === 'movie') {
  //     setQueryMovies(inputQuery);
  //     triggerSearchMovies(inputQuery);
  //   }
  //   if (media_type === 'tv') {
  //     setQuerySeries(inputQuery);
  //     triggerSearchSeries(inputQuery);
  //   }
  // };

  return (
    <div>
      <Header title="xaxo+" />
      <Switch>
        <Route exact path="/info/:media_type/:id">
          <p>hello there</p>
        </Route>
        <Route exact path="/home">
          {moviesError || seriesError ? (
            <>Oh no, there was an error</>
          ) : moviesIsLoading || seriesIsLoading ? (
            <>Loading...</>
          ) : moviesData?.results && seriesData?.results ? (
            <PopularContent movies={moviesData.results} series={seriesData.results} />
          ) : null}
        </Route>
        <Redirect to="/home" />
      </Switch>

      {/* <h1>SEARCH MOVIES</h1>
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
      ) : null} */}
    </div>
  );
}
