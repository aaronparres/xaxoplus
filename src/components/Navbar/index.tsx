import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/svg/logo.svg';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import NavbarElement from './NavbarElement';

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
        <NavbarElement
          text="SEARCH"
          color="white"
          icon={faSearch}
          titleStyles={styles.element__title}
        />
      </Link>
    </nav>
  );
}
