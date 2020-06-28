import { css } from '@emotion/core';
import { isDesktop } from '../../utils/breakpoints';

export const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100vw;
  padding: 1rem;
  background: white;
  height: 4rem;
  ${isDesktop} {
    height: 6rem;
    padding: 2rem;
    margin: 0 auto;
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const formButton = position => css`
  width: 50%;
  margin-${position}: 0.5rem;

`;
