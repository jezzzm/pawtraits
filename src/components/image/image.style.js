import { css } from '@emotion/core';

export const wrapper = (isThumbnail) => css`
  display: flex;
  ${isThumbnail
    ? css`
        flex-direction: column;
        justify-content: space-between;
        column-break-inside: avoid;
        page-break-inside: avoid; 
        `
    : css`
        max-height: 100vh;
        max-width: 100vw;
        @media (orientation: landscape) {
          flex-direction: row-reverse;
        }

        @media (orientation: portrait) {
          flex-direction: column;
        }
      `}
`;

export const imageContainer = (isThumbnail) => css`
  padding: 0;
  ${isThumbnail
    ? css`
        display: block;
        margin: 0 auto;
        background: white;
        border: 0;
        flex: 1;
      `
    : css`
        flex: 2;
      `}
`;


export const image = (isThumbnail) => css`
  display: block;
  margin: 0 auto;
  height: auto;
  max-height: 100vh;
  max-width: 100vw;
  ${isThumbnail
    ? css`
        width: 12rem;
        flex: 1;`
    : css`
        width: auto;
    `}
`;

export const text = (isThumbnail) => css`
  margin: 0;
  text-align: center;
  ${isThumbnail
    ? css`
        flex: 0;
        padding: 12px;
      `
    : css`
        align-self: center;
        flex: 1;
        padding: 24px;
    `}
`;

