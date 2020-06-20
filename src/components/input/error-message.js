import React from 'react';
import { css } from '@emotion/core';
const errorStyle = css`
  display: block;
  padding: 0.2rem 0 0.2rem 0.4rem;
  margin: 1rem 0 0 1rem;
  line-height: 1.4;
  border-left: 3px solid #ffc7d1;
  color: #ff94a7;
`;
export default function ErrorMessage({ error }) {
  const visible = error?.message?.length > 0;
  return visible ? <span css={errorStyle}>{error.message}</span> : null;
}
