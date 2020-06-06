import React from 'react';
import { css } from '@emotion/core'

const header = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: white;
  box-shadow: 0 0 2px rgba(0,0,0,0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`;

export default function Header({getOwnClick}) {
  return (
    <div css={header}>
      <span>Sydney Pawtraits</span>
      <div>
        <button onClick={getOwnClick}>Get Your Own</button>
      </div>
    </div>
  );
}