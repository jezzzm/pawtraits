import { css } from '@emotion/core';

export const input = (hasError) => css`
  padding: 6px 12px;
  ${hasError ? `color: red;` : undefined}
`;
export const error = css`
  display: block;
  padding-top: 6px;
  color: red;
`;
export const text = css`
  display: block;
  margin: 6px 0;
`;
export const label = css`
  display: block;
  margin-bottom: 24px;
`;