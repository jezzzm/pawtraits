import { css } from '@emotion/core';

export const lightbox = (styleOverride) => css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  ${styleOverride
    ? css`
        ${styleOverride}
      `
    : css`
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
`;

export const close = css`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
`;