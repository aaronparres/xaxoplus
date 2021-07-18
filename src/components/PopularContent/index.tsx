import { MovieResult, TvResult } from 'models/tmdb.model';

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
        <p key={index}>{element.original_title}</p>
      ))}

      <h1>SERIES</h1>
      {series.map((element, index) => (
        <p key={index}>{element.name}</p>
      ))}
    </div>
  );
}
