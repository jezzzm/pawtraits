import { css } from '@emotion/core';

export const button = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  column-break-inside: avoid;
  page-break-inside: avoid;

  padding: 0;
  margin: 0 auto;
  background: white;
  border: 0;
`;

export const thumbnail = css`
  display: block;
  margin: 0 auto;
  align-self: flex-start
  width: 12rem;
  max-width: 12rem;
`;

export const textContainer = css`
  margin: 0;
  text-align: center;
  flex: 0;
  padding: 12px;
  width: 100%;
`;
