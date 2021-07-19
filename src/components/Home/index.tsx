import { useGetPopularMoviesQuery, useGetPopularSeriesQuery } from 'store/apis/tmdb';

import Switch from 'components/UI/Switch';
import PopularContent from 'components/PopularContent';
import Spinner from 'components/UI/Spinner';
import { useAppDispatch } from 'hooks/redux';

export default function Home() {
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

  return (
    <div>
      <Switch />
      {moviesIsLoading && seriesIsLoading ? (
        <Spinner />
      ) : moviesError || seriesError ? (
        <>Oh no! There was a problem</>
      ) : moviesData?.results || seriesData?.results ? (
        <PopularContent movies={moviesData?.results} series={seriesData?.results} />
      ) : null}
    </div>
  );
}
