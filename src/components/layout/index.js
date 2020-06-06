import React, { useState, useEffect } from 'react';
import { Global } from '@emotion/core';
import layout from './layout.style';
import Header from '../header'

export default function Layout({ children }) {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <div>
      <Global styles={layout} />
      <Header getOwnClick={() => setFormOpen(true)} />
      <Form isOpen={formOpen} onClose={() => setFormOpen(false)}/>
      {children}
    </div>
  );
};
