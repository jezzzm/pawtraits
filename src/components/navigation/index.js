import React from 'react';
import * as styles from './navigation.style';
import useWindowSize from '../../utils/use-window-size';

export default function Navigation({ getOwnClick }) {
  const { isMobile } = useWindowSize();

  return (
    <div css={styles.navigation}>
      {!isMobile && <h2>Sydney Pawtraits</h2>}
      <div>
        <button onClick={getOwnClick}>Get Your Own</button>
      </div>
    </div>
  );
}
