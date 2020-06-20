import { css } from '@emotion/core';
import { isDesktop } from '../../utils/breakpoints';

export const modal = css`
  position: fixed;
  top: 0;
  height: 100vh;
  left: 0;
  width: 100vw;
  color: #443636;
  background: white;
  display: grid;
  grid-template-rows: 4rem auto;
  ${isDesktop} {
    grid-template-rows: 6rem auto;
  }
`;

export const header = css`
  align-self: center;
  margin-left: 1rem;

  ${isDesktop} {
    margin-left: 2rem;
  }
`;

export const close = css`
  z-index: 100;
`;
