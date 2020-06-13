import React, { useState } from 'react';
import { Global } from '@emotion/core';
import * as styles from './layout.style';
import Header from '../header'
import Form from '../form';

export default function Layout({ children }) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div css={styles.pageContainer}>
      <Global styles={styles.layout} />
      <Header getOwnClick={() => setFormOpen(true)} />
      <Form isOpen={formOpen} onClose={() => setFormOpen(false)} />
      {children}
    </div>
  );
};
