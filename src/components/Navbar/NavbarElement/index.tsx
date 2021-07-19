import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import styles from './styles.module.scss';

interface NavbarElementProps {
  icon: IconProp;
  text: string;
  color: string;
}

export default function NavbarElement({ icon, text, color }: NavbarElementProps) {
  return (
    <>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={icon} color={color} />
      </div>
      <p className={styles.element__title}>{text}</p>
    </>
  );
}
