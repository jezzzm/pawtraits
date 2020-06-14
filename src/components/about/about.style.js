import { css } from '@emotion/core';
import { isDesktop } from '../../utils/breakpoints';

export const outer = css`
  position: absolute;
  top: 4rem;
  bottom: 0;
  overflow: auto;
  width: 100%;
  ${isDesktop} {
    top: 6rem;
  }
`;

export const inner = css`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
`;
