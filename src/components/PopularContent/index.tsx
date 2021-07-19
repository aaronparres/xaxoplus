import { useHistory } from 'react-router-dom';
import { MovieResult, TvResult } from 'models/tmdb.model';

import { useAppSelector } from 'hooks/redux';
import { selectSwitchMediaType } from 'store/slices/settings';

import defaultPoster from 'assets/images/default-poster.png';

import styles from './styles.module.scss';

interface PopularContentProps {
  movies?: MovieResult[];
  series?: TvResult[];
}

export default function PopularContent({ movies, series }: PopularContentProps) {
  const history = useHistory();
  const switchValue = useAppSelector(selectSwitchMediaType);

  const handleImageClick = (path: string) => {
    history.push(path);
  };

  return (
    <div className={styles.imagesContainer}>
      {switchValue === 'movie' && (
        <>
          {movies?.map((media, index) => (
            <article
              key={index}
              className={styles.imageElement}
              onClick={() => handleImageClick(`/info/movie/${media.id}`)}
            >
              {media.poster_path === null ? (
                <img src={defaultPoster} />
              ) : (
                <img src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`} />
              )}
              <div className={styles.mediaVoteAvrg}>
                <p>{media.vote_average}</p>
              </div>
              <div className={styles.mediaTitle}>
                <h3>{media.original_title}</h3>
              </div>
            </article>
          ))}
        </>
      )}

      {switchValue === 'tv' && (
        <>
          {series?.map((media, index) => (
            <article
              key={index}
              className={styles.imageElement}
              onClick={() => handleImageClick(`/info/tv/${media.id}`)}
            >
              <img
                src={`${
                  media.poster_path === null
                    ? defaultPoster
                    : `https://image.tmdb.org/t/p/w500/${media.poster_path}`
                }`}
              />
              <div className={styles.mediaVoteAvrg}>
                <p>{media.vote_average}</p>
              </div>
              <div className={styles.mediaTitle}>
                <h3>{media.name}</h3>
              </div>
            </article>
          ))}{' '}
        </>
      )}
    </div>
  );
}
