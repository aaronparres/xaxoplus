import { useEffect, useState } from 'react';
import styles from './App.module.scss';

export default function App() {
  const [literal, setLiteral] = useState('');

  useEffect(() => {
    if (literal !== '') return;
    setLiteral('hello there');
  }, []);

  return <div className={styles.app}>{literal}</div>;
}
