import { ReactComponent as PlayLogo } from 'assets/svg/play-logo.svg';

import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <PlayLogo className={styles.logo} />
      <div className={styles.terms}>
        <p className={styles.terms__element}>Privacy Policy</p>
        <p className={styles.terms__element}>Cookies Policy</p>
        <p className={styles.terms__element}>Subscription Contract</p>
        <p className={styles.terms__element}>Help</p>
        <p className={styles.terms__element}>About xaxoplus</p>
      </div>
    </footer>
  );
}
