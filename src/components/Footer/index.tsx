import { ReactComponent as PlayLogo } from 'assets/svg/play-logo.svg';

import styles from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <PlayLogo className={styles.footer__logo} />
      <div className={styles.footer__terms}>
        <p className={styles.footer__termsElements}>Privacy Policy</p>
        <p className={styles.footer__termsElements}>Cookies Policy</p>
        <p className={styles.footer__termsElements}>Subscription Contract</p>
        <p className={styles.footer__termsElements}>Help</p>
        <p className={styles.footer__termsElements}>About XAXOPLUS</p>
      </div>
    </footer>
  );
}
