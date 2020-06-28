/* eslint-disable import/prefer-default-export */
import { css } from '@emotion/core';
import { isMobile, isDesktop } from '../../utils/breakpoints';

export const content = css`
  display: grid;

  ${isMobile} {
    grid-template-rows: 4rem auto;
    align-items: center;
  }
  ${isDesktop} {
    grid-template-columns: 40% 60%;
    align-items: center;
    height: calc(100vh - 6rem);
  }
`;
