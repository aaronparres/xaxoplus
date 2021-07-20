import { Link } from 'react-router-dom';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

export default function GoBackButton() {
  return (
    <Link to="/" className={styles.goBackButton}>
      <p>
        <span>
          <FontAwesomeIcon icon={faChevronLeft} color="white" />
        </span>
        Go back
      </p>
    </Link>
  );
}
