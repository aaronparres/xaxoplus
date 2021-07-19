import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Logo } from 'assets/svg/logo.svg';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

export default function Header() {
  const [showTab, setShowTab] = useState(false);

  useEffect(() => {
    function hideOnScroll() {
      if (window.scrollY > 5) {
        setShowTab(true);
      } else {
        setShowTab(false);
      }
    }
    window.addEventListener('scroll', hideOnScroll);
    return () => {
      window.removeEventListener('scroll', hideOnScroll);
    };
  }, []);

  return (
    <nav className={`${styles.nav} ${showTab && styles.showTab}`}>
      <Link to="/home">
        <Logo className={styles.logo} />
      </Link>
      <Link to="/search" className={styles.element}>
        <div className={styles.iconWrapper}>
          <FontAwesomeIcon icon={faSearch} color="white" />
        </div>
        <p className={styles.element__title}>SEARCH</p>
      </Link>
    </nav>
  );
}
