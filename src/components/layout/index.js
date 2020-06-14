import React from 'react';
import { Global } from '@emotion/core';
import * as styles from './layout.style';
import Navigation from '../navigation';

export default function Layout({ children }) {
  return (
    <div css={styles.pageContainer}>
      <Global styles={styles.layout} />
      <Navigation />
      {children}
    </div>
  );
}
