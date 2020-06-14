import React, { useState } from 'react';
import { Global } from '@emotion/core';
import * as styles from './layout.style';
import Navigation from '../navigation';
import Form from '../form';

export default function Layout({ children }) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div css={styles.pageContainer}>
      <Global styles={styles.layout} />
      <Navigation getOwnClick={() => setFormOpen(true)} />
      <Form isOpen={formOpen} onClose={() => setFormOpen(false)} />
      {children}
    </div>
  );
}
