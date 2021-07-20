import { useEffect } from 'react';
import { useHistory } from 'react-router';
import ReactStars from 'react-stars';

import MediaElement from 'components/MediaElement';
import GoBackButton from 'components/UI/GoBackButton';
import { MovieResult, TvResult } from 'models/tmdb.model';

import defaultPoster from 'assets/images/default-poster.png';

import styles from './styles.module.scss';

interface InfoProps {
  type: string;
  title?: string;
  voteAvrg?: number;
  year?: string;
  overview?: string;
  image: string;
  movieRecomendations?: MovieResult[];
  serieRecomendations?: TvResult[];
}

export default function Info({
  type,
  title,
  voteAvrg,
  year,
  overview,
  image,
  movieRecomendations,
  serieRecomendations,
}: InfoProps) {
  const history = useHistory();

  useEffect(() => window.scrollTo(0, 0), []);

  const convertDate = (date: string) => {
    return date.split('-').reverse().join('-');
  };

  const handleImageClick = (path: string) => {
    history.push(path);
    history.go(0);
  };

  return (
    <>
      <GoBackButton />
      <div className={styles.infoContainer}>
        <img src={image} alt={title} />
        <div className={styles.info}>
          <h1>{title}</h1>
          <ReactStars
            className="stars"
            count={5}
            value={Number(voteAvrg) / 2}
            size={30}
            color2={'#384a8d'}
            edit={false}
          />
          <h3>{year && convertDate(year)}</h3>
          <p>{overview}</p>
        </div>
      </div>
      <h1 style={{ textAlign: 'center', marginTop: '5rem', fontSize: '2rem' }}>
        You should also like...
      </h1>
      <div className={styles.similarsContainer}>
        {movieRecomendations &&
          movieRecomendations?.map((movie, index) => (
            <MediaElement
              key={index}
              title={movie.original_title}
              handleRedirection={() => handleImageClick(`/info/${type}/${movie.id}`)}
              image={
                movie.poster_path === null
                  ? defaultPoster
                  : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              }
            />
          ))}
        {serieRecomendations &&
          serieRecomendations?.map((serie, index) => (
            <MediaElement
              key={index}
              title={serie.name}
              handleRedirection={() => handleImageClick(`/info/${type}/${serie.id}`)}
              image={
                serie.poster_path === null
                  ? defaultPoster
                  : `https://image.tmdb.org/t/p/w500/${serie.poster_path}`
              }
            />
          ))}
      </div>
    </>
  );
}
