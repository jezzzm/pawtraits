import { css } from '@emotion/core';
import { isDesktop, isMobile } from '../../utils/breakpoints';

export const lightbox = css`
  position: fixed;
  top: 0;
  height: 100vh;
  left: 0;
  width: 100vw;
  display: grid;
  color: #443636;
  background: white;

  ${isMobile} {
    background: white;
    grid-template-rows: 4rem auto;
  }
  ${isDesktop} {
    grid-template-rows: 6rem auto;
  }
`;

export const header = css`
  align-self: center;
  ${isMobile} {
    margin-left: 1rem;
  }
  ${isDesktop} {
    margin-left: 2rem;
  }
`;

export const close = css`
  color: #443636;
  z-index: 100;
  padding: 0.4rem 1.2rem;
  transition: 0.2s all;
  font-family: Rubik;
  font-weight: 300;

  background: #efeeee;
  border-radius: 0.4rem;
  border: 0;
`;

export const content = css`
  display: grid;

  ${isMobile} {
    grid-template-rows: 4rem auto;
    align-items: start;
  }
  ${isDesktop} {
    grid-template-columns: 40% 60%;
    align-items: center;
  }
`;
