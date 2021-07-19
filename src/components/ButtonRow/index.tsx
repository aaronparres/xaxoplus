import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { changeMediaType, selectSwitchMediaType } from 'store/slices/settings';

import styles from './styles.module.scss';

export default function ButtonRow() {
  const dispatch = useAppDispatch();
  const mediaType = useAppSelector(selectSwitchMediaType);

  const switchHandler = (type: string) => {
    dispatch(changeMediaType(type));
  };

  return (
    <div className={styles.buttonContainer}>
      <div
        className={`${mediaType === 'movie' ? styles.buttonSelected : styles.buttonIdle}`}
      >
        <div onClick={() => switchHandler('movie')}>Movies</div>
      </div>
      <div
        className={`${mediaType === 'tv' ? styles.buttonSelected : styles.buttonIdle}`}
      >
        <div onClick={() => switchHandler('tv')}>Series</div>
      </div>
    </div>
  );
}
