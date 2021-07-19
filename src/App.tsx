import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from 'components/Navbar';
import MediaInfo from 'components/MediaInfo';
import Search from 'components/Search';
import Home from 'components/Home';
import Footer from 'components/Footer';

import styles from './App.module.scss';

export default function App() {
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <Switch>
          <Route exact path="/info/:media_type/:id" component={MediaInfo} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/home" component={Home} />
          <Redirect to="/home" />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}
