import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { useLazyGetInfoMovieQuery, useLazyGetInfoSerieQuery } from 'store/apis/tmdb';

interface ParamTypes {
  media_type: string;
  id: string;
}

export default function MediaInfo() {
  const history = useHistory();
  const { media_type, id } = useParams<ParamTypes>();

  const [
    triggerMovie,
    { data: movieData, error: movieError, isLoading: movieIsLoading },
  ] = useLazyGetInfoMovieQuery();

  const [
    triggerSerie,
    { data: serieData, error: serieError, isLoading: serieIsLoading },
  ] = useLazyGetInfoSerieQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (media_type === 'movie') triggerMovie(id);
    if (media_type === 'tv') triggerSerie(id);
  }, []);

  return (
    <div>
      <div onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faAngleLeft} size="lg" color="white" />
      </div>
      {media_type === 'movie' && movieError ? (
        <>Oh no, there was an error</>
      ) : movieIsLoading ? (
        <>Loading...</>
      ) : movieData ? (
        <>
          <h1>{movieData?.original_title}</h1>
        </>
      ) : null}
      {media_type === 'tv' && serieError ? (
        <>Oh no, there was an error</>
      ) : serieIsLoading ? (
        <>Loading...</>
      ) : serieData ? (
        <>
          <h1>{serieData?.name}</h1>
        </>
      ) : null}
    </div>
  );
}
