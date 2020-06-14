import { css } from '@emotion/core';
import { isMobile, isDesktop } from '../../utils/breakpoints';

export const imageContainer = css`
  display: flex;
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
`;

export const image = css`
  background: white;
  align-self: center;
  max-height: 100%;

  ${isMobile} {
    height: auto;
    width: 100%;
    object-fit: cover;
  }

  ${isDesktop} {
    max-width: 100%;
  }
`;

export const info = css`
  margin: 0 1rem;

  ${isDesktop} {
    text-align: right;
    margin: 0 4rem 0 2rem;
  }
`;
