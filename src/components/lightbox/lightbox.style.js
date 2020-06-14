import { css } from '@emotion/core';
import { isMobile, isDesktop } from '../../utils/breakpoints';

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
