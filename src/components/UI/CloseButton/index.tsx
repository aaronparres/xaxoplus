import { Link } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

export default function CloseButton() {
  return (
    <Link to="/" className={styles.closeButton}>
      <p>
        <span>
          <FontAwesomeIcon icon={faTimes} color="white" />
        </span>
      </p>
    </Link>
  );
}
