import styles from './styles.module.css';

const Spinner = ({ fullPage = false }) => {
  return (
    <div className={`${styles.overlay} ${fullPage ? styles.fullPage : ''}`}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export { Spinner };