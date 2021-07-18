import { MovieResult, TvResult } from 'models/tmdb.model';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

interface PopularContentProps {
  movies: MovieResult[];
  series: TvResult[];
}

export default function PopularContent({ movies, series }: PopularContentProps) {
  return (
    <div>
      <h1>MOVIES</h1>
      {movies.map((element, index) => (
        <Link key={index} to={`/info/movie/${element.id}`}>
          <p>{element.original_title}</p>
        </Link>
      ))}

      <h1>SERIES</h1>
      {series.map((element, index) => (
        <Link key={index} to={`/info/tv/${element.id}`}>
          <p>{element.name}</p>
        </Link>
      ))}
    </div>
  );
}
