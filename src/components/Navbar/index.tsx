import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Logo } from 'assets/svg/logo.svg';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

export default function Header() {
  return (
    <nav className={styles.nav}>
      <Link to="/home">
        <Logo className={styles.nav__logo} />
      </Link>
      <Link to="/search" className={styles.nav__element}>
        <div className={styles.nav__iconWrapper}>
          <FontAwesomeIcon icon={faSearch} color="white" />
        </div>
        <p className={styles.nav__elementTitle}>SEARCH</p>
      </Link>
    </nav>
  );
}
