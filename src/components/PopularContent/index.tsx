import { useHistory } from 'react-router-dom';
import { MovieResult, TvResult } from 'models/tmdb.model';

import { useAppSelector } from 'hooks/redux';
import { selectSwitchMediaType } from 'store/slices/settings';

import defaultPoster from 'assets/images/default-poster.png';

import styles from './styles.module.scss';
import MediaElement from 'components/MediaElement';

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
            <MediaElement
              key={index}
              handleRedirection={() =>
                handleImageClick(`/info/${switchValue}/${media.id}`)
              }
              voteAvrg={media.vote_average}
              title={media.original_title}
              image={
                media.poster_path === null
                  ? defaultPoster
                  : `https://image.tmdb.org/t/p/w500/${media.poster_path}`
              }
            />
          ))}
        </>
      )}

      {switchValue === 'tv' && (
        <>
          {series?.map((media, index) => (
            <MediaElement
              key={index}
              handleRedirection={() =>
                handleImageClick(`/info/${switchValue}/${media.id}`)
              }
              voteAvrg={media.vote_average}
              title={media.name}
              image={
                media.poster_path === null
                  ? defaultPoster
                  : `https://image.tmdb.org/t/p/w500/${media.poster_path}`
              }
            />
          ))}
        </>
      )}
    </div>
  );
}
