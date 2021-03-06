import { css } from '@emotion/core';
import { isMobile, isDesktop } from '../../utils/breakpoints';

export const imageContainer = css`
  display: flex;
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

export const image = css`
  background: white;
  align-self: center;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  ${isDesktop} {
    img {
      max-height: 100%;
      transform: translateY(-50%);
      top: 50%;
      position: relative;
    }
  }
  ${isMobile} {
    height: auto;
    margin: 0 auto;
  }
`;

export const info = css`
  margin: 0 1rem;

  ${isDesktop} {
    text-align: right;
    margin: 0 4rem 0 2rem;
  }
`;
