import { css } from '@emotion/core';
import { isDesktop } from '../utils/breakpoints';

export const ctaButton = css`
  background: #268e46;
  border: 0;
  border-radius: 0.4rem;
  color: white;
  padding: 0.4rem 1.2rem;
  ${isDesktop} {
    padding: 0.6rem 1.8rem;
  }
`;
