import React from 'react';
import * as styles from './header.style';

export default function Header({ getOwnClick }) {
  return (
    <div css={styles.header}>
      <h2>Sydney Pawtraits</h2>
      <div>
        <button onClick={getOwnClick}>Get Your Own</button>
      </div>
    </div>
  );
}
