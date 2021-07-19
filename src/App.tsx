import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from 'components/Navbar';
import PopularContent from 'components/PopularContent';
import Footer from 'components/Footer';
import MediaInfo from 'components/MediaInfo';
import Search from 'components/Search';

import { useGetPopularMoviesQuery, useGetPopularSeriesQuery } from 'store/apis/tmdb';

import styles from './App.module.scss';

export default function App() {
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
    <div className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <Switch>
          <Route exact path="/info/:media_type/:id" component={MediaInfo} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/home">
            {moviesError || seriesError ? (
              <>Oh no, there was an error</>
            ) : moviesIsLoading || seriesIsLoading ? (
              <>Loading...</>
            ) : moviesData?.results && seriesData?.results ? (
              <PopularContent movies={moviesData.results} series={seriesData.results} />
            ) : null}
          </Route>
          <Redirect to="/home" />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}
