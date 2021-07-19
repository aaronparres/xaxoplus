import { Link } from 'react-router-dom';
import { MovieResult, TvResult } from 'models/tmdb.model';

import { useAppSelector } from 'hooks/redux';
import { selectSwitchMediaType } from 'store/slices/settings';

import styles from './styles.module.scss';

interface PopularContentProps {
  movies?: MovieResult[];
  series?: TvResult[];
}

export default function PopularContent({ movies, series }: PopularContentProps) {
  const switchValue = useAppSelector(selectSwitchMediaType);

  return (
    <div>
      {switchValue === 'movie' && (
        <>
          <h1>MOVIES</h1>
          {movies?.map((element, index) => (
            <Link key={index} to={`/info/movie/${element.id}`}>
              <p>{element.original_title}</p>
            </Link>
          ))}
        </>
      )}

      {switchValue === 'tv' && (
        <>
          <h1>SERIES</h1>
          {series?.map((element, index) => (
            <Link key={index} to={`/info/tv/${element.id}`}>
              <p>{element.name}</p>
            </Link>
          ))}{' '}
        </>
      )}
    </div>
  );
}
