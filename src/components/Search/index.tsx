import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  useLazyGetSearchMoviesQuery,
  useLazyGetSearchSeriesQuery,
} from 'store/apis/tmdb';
import Spinner from 'components/UI/Spinner';
import { MovieResult, TvResult } from 'models/tmdb.model';
import {
  saveToPreviousSearchMovies,
  saveToPreviousSearchSeries,
  selectPreviousSearchElements,
} from 'store/slices/settings';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

export default function Search() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const previousSearch = useAppSelector(selectPreviousSearchElements);

  useEffect(() => window.scrollTo(0, 0), []);

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

  const handleInputSearch = (inputQuery: string) => {
    setSearchQuery(inputQuery);
    triggerSearchMovies(inputQuery);
    triggerSearchSeries(inputQuery);
  };

  const handleSearchMovieSelection = (data: MovieResult, type: string) => {
    dispatch(saveToPreviousSearchMovies({ data }));
    history.push(`/info/${type}/${data.id}`);
  };

  const handleSearchSerieSelection = (data: TvResult, type: string) => {
    dispatch(saveToPreviousSearchSeries({ data }));
    history.push(`/info/${type}/${data.id}`);
  };

  return (
    <div>
      <p>search</p>
      <div onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faTimes} size="lg" color="white" />
      </div>
      <input
        type="text"
        value={searchQuery}
        style={{ color: 'grey' }}
        onChange={e => handleInputSearch(e.target.value)}
      />
      {searchMoviesIsLoading && searchSeriesIsLoading && <Spinner />}
      {previousSearch && (
        <>
          {previousSearch.movies.map((movie, index) => (
            <Link key={index} to={`/info/movie/${movie.id}`}>
              <p>{movie.original_title}</p>
            </Link>
          ))}
          {previousSearch.series.map((serie, index) => (
            <Link key={index} to={`/info/tv/${serie.id}`}>
              <p>{serie.name}</p>
            </Link>
          ))}
        </>
      )}
      _________________
      {searchMoviesError ? null : searchMoviesData?.results ? (
        <>
          {searchMoviesData.results.map((movie, index) => (
            <div onClick={() => handleSearchMovieSelection(movie, 'movie')} key={index}>
              <h4>{movie.original_title}</h4>
            </div>
          ))}
        </>
      ) : null}
      {searchSeriesError ? null : searchSeriesData?.results ? (
        <>
          {searchSeriesData.results.map((serie, index) => (
            <div onClick={() => handleSearchSerieSelection(serie, 'tv')} key={index}>
              <h4>{serie.name}</h4>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}
