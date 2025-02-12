import React from 'react';
import styles from './styles.module.css';

export default function LoadingState(): JSX.Element {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingIcon}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.spinner}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v2M12 16v2M6 12h2M16 12h2" />
        </svg>
      </div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
}