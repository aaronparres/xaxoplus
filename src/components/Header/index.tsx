import styles from './styles.module.scss';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return <h1 className={styles.title}>{title}</h1>;
}
