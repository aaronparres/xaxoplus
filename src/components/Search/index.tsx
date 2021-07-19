import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  useLazyGetSearchMoviesQuery,
  useLazyGetSearchSeriesQuery,
} from 'store/apis/tmdb';

export default function Search() {
  const history = useHistory();
  const [queryMovies, setQueryMovies] = useState('');
  const [querySeries, setQuerySeries] = useState('');

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
      <p>search</p>
      <div onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faTimes} size="lg" color="white" />
      </div>
      <h1>SEARCH MOVIES</h1>
      <input
        type="text"
        value={queryMovies}
        style={{ color: 'grey' }}
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
        style={{ color: 'grey' }}
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
