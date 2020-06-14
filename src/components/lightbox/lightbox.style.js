import { css } from '@emotion/core';
import { isDesktop } from '../../utils/breakpoints';

export const lightbox = css`
  position: fixed;
  top: 0;
  height: 100vh;
  left: 0;
  width: 100vw;
  display: grid;
  grid-template-rows: 6rem auto;

  background: #efeeee;
  color: #443636;
`;

export const closeContainer = css`
  margin: 2rem;
  align-self: center;
`;

export const close = css`
  color: #443636;
  z-index: 100;
  padding: 0.4rem 1.2rem;
  transition: 0.2s all;
  font-family: Rubik;
  font-weight: 300;

  background: #efeeee;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.4rem;
  box-shadow: -3px -3px 8px rgba(255, 255, 255, 0.6), 3px 3px 8px #d1cdc780;
`;

export const contentContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${isDesktop} {
    margin-bottom: 24px;
    max-height: calc(100% - 76px);
    padding: 0 36px 48px;
  }
`;
