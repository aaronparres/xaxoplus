import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useGetMediaInfoQuery } from 'store/apis/tmdb';
import { MovieResult, TvResult } from 'models/tmdb.model';

interface ParamTypes {
  media_type: string;
  id: string;
}

export default function MediaInfo() {
  const history = useHistory();
  const { media_type, id } = useParams<ParamTypes>();

  const { data, error, isLoading } = useGetMediaInfoQuery({ media_type, id });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faAngleLeft} size="lg" color="white" />
      </div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h1>{data.name && data.name}</h1>
          <h1>{data.original_title && data.original_title}</h1>
        </>
      ) : null}
      {id}
    </div>
  );
}
