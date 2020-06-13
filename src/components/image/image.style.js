import { css } from '@emotion/core';
import { isMobile, isDesktop } from '../../utils/breakpoints';

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
        max-height: 100%;
        height: 100%;
        justify-content: center;
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
        ${isDesktop} {
          flex: 2;
          height: 100%;
          max-height: 100%;
          display: flex;
          align-items: center;
        }
      `}
`;

export const image = (isThumbnail) => css`
  display: block;
  margin: 0 auto;
  height: auto;
  max-height: 100%;
  max-width: 100vw;
  ${isThumbnail
    ? css`
        width: 12rem;
        flex: 1;
      `
    : css`
        ${isMobile} {
          width: calc(100vw - 2rem);
        }
        ${isDesktop} {
          width: auto;
          align-self: center;
        }
        border-radius: 2rem;
        padding: 1.5rem;
        background: white;
      `}
`;

export const textContainer = (isThumbnail) => css`
  margin: 0;
  text-align: center;
  ${isThumbnail
    ? css`
        flex: 0;
        padding: 12px;
      `
    : css`
        ${isDesktop} {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }
        padding: 24px;
      `}
`;
