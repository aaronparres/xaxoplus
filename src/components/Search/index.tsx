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
import MediaElement from 'components/MediaElement';

import defaultPoster from 'assets/images/default-poster.png';

import styles from './styles.module.scss';

export default function Search() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');
  const [hidePrevious, setHidePrevious] = useState(false);
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
    setHidePrevious(true);
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
    <>
      <Link to="/" className={styles.closeButton}>
        <p>
          <span>
            <FontAwesomeIcon icon={faTimes} color="white" />
          </span>
        </p>
      </Link>
      <div className={styles.mainContainer}>
        <input
          type="text"
          value={searchQuery}
          placeholder="Search..."
          onChange={e => handleInputSearch(e.target.value)}
        />
        {searchMoviesIsLoading && searchSeriesIsLoading && <Spinner />}
        {!hidePrevious && <h1>Previous searches</h1>}
        <div className={styles.imagesContainer}>
          {!hidePrevious && previousSearch && (
            <>
              {previousSearch.movies.map((movie, index) => (
                <div
                  onClick={() => handleSearchMovieSelection(movie, 'movie')}
                  key={index}
                >
                  <MediaElement
                    title={movie.original_title}
                    image={
                      movie.poster_path === null
                        ? defaultPoster
                        : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    }
                  />
                </div>
              ))}
              {previousSearch.series.map((serie, index) => (
                <div onClick={() => handleSearchSerieSelection(serie, 'tv')} key={index}>
                  <MediaElement
                    title={serie.name}
                    image={
                      serie.poster_path === null
                        ? defaultPoster
                        : `https://image.tmdb.org/t/p/w500/${serie.poster_path}`
                    }
                  />
                </div>
              ))}
            </>
          )}
        </div>
        {searchQuery && <h1>Search for {searchQuery}</h1>}
        <div className={styles.imagesContainer}>
          {searchMoviesError ? null : searchMoviesData?.results ? (
            <>
              {searchMoviesData.results.map((movie, index) => (
                <div
                  onClick={() => handleSearchMovieSelection(movie, 'movie')}
                  key={index}
                >
                  <MediaElement
                    title={movie.original_title}
                    image={
                      movie.poster_path === null
                        ? defaultPoster
                        : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    }
                  />
                </div>
              ))}
            </>
          ) : null}
          {searchSeriesError ? null : searchSeriesData?.results ? (
            <>
              {searchSeriesData.results.map((serie, index) => (
                <div onClick={() => handleSearchSerieSelection(serie, 'tv')} key={index}>
                  <MediaElement
                    title={serie.name}
                    image={
                      serie.poster_path === null
                        ? defaultPoster
                        : `https://image.tmdb.org/t/p/w500/${serie.poster_path}`
                    }
                  />
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
