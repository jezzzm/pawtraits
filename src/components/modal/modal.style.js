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
  margin-right: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${isDesktop} {
    margin-left: 2rem;
    margin-right: 2rem;
  }
  button {
    align-self: center;
  }

  picture {
    display: block;
    max-height: 80px;
    height: 80px;
    img {
      display: block;
      max-height: 100%;
    }
  }
`;

export const close = css`
  z-index: 100;
`;
