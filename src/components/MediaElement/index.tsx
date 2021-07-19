import styles from './styles.module.scss';

interface MediaElementProps {
  key?: number;
  voteAvrg?: number;
  title?: string;
  image: string;
  handleRedirection: () => void;
}

export default function MediaElement({
  handleRedirection,
  voteAvrg,
  title,
  image,
}: MediaElementProps) {
  return (
    <article className={styles.imageElement} onClick={handleRedirection}>
      <img src={image} alt={title} />
      <div className={styles.mediaVoteAvrg}>
        <p>{voteAvrg}</p>
      </div>
      <div className={styles.mediaTitle}>
        <h3>{title}</h3>
      </div>
    </article>
  );
}
