import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useLazyGetInfoMovieQuery,
  useLazyGetInfoSerieQuery,
  useLazyGetSimilarMoviesQuery,
  useLazyGetSimilarSeriesQuery,
} from 'store/apis/tmdb';
import Spinner from 'components/UI/Spinner';
import Info from './Info';

import defaultPoster from 'assets/images/default-poster.png';

import styles from './styles.module.scss';

interface ParamTypes {
  media_type: string;
  id: string;
}

export default function MediaInfo() {
  const { media_type, id } = useParams<ParamTypes>();

  const [
    triggerMovie,
    { data: movieData, error: movieError, isLoading: movieIsLoading },
  ] = useLazyGetInfoMovieQuery();

  const [
    triggerSerie,
    { data: serieData, error: serieError, isLoading: serieIsLoading },
  ] = useLazyGetInfoSerieQuery();

  const [
    triggerSimilarMovies,
    {
      data: movieSimilarData,
      error: movieSimilarError,
      isLoading: movieSimilarIsLoading,
    },
  ] = useLazyGetSimilarMoviesQuery();

  const [
    triggerSimilarSeries,
    {
      data: serieSimilarData,
      error: serieSimilarError,
      isLoading: serieSimilarIsLoading,
    },
  ] = useLazyGetSimilarSeriesQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (media_type === 'movie') {
      triggerMovie(id);
      triggerSimilarMovies(id);
    }
    if (media_type === 'tv') {
      triggerSerie(id);
      triggerSimilarSeries(id);
    }
  }, []);

  return (
    <div className={styles.container}>
      {(media_type === 'movie' && movieError) || movieSimilarError ? (
        <>Oh no, there was an error</>
      ) : movieIsLoading && movieSimilarIsLoading ? (
        <Spinner />
      ) : movieData && movieSimilarData ? (
        <Info
          type={media_type}
          title={movieData.original_title}
          voteAvrg={movieData.vote_average}
          year={movieData.release_date}
          overview={movieData.overview}
          image={
            movieData.poster_path === null
              ? defaultPoster
              : `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
          }
          movieRecomendations={movieSimilarData.results}
        />
      ) : null}
      {(media_type === 'tv' && serieError) || serieSimilarError ? (
        <>Oh no, there was an error</>
      ) : serieIsLoading && serieSimilarIsLoading ? (
        <Spinner />
      ) : serieData && serieSimilarData ? (
        <Info
          type={media_type}
          title={serieData.name}
          voteAvrg={serieData.vote_average}
          year={serieData.first_air_date}
          overview={serieData.overview}
          image={
            serieData.poster_path === null
              ? defaultPoster
              : `https://image.tmdb.org/t/p/w500/${serieData.poster_path}`
          }
          serieRecomendations={serieSimilarData.results}
        />
      ) : null}
    </div>
  );
}
