import { css } from '@emotion/core';
import { isMobile, isDesktop } from '../../utils/breakpoints';

export const outer = css`
  position: fixed;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  padding: 0 2rem;
  height: 6rem;
  ${isDesktop} {
    top: 0;
  }

  ${isMobile} {
    bottom: 0;
  }
`;

export const inner = css`
  height: 100%;
  ${isMobile} {
    margin-bottom: 2rem;
  }
  ${isDesktop} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1280px;
    margin: 0 auto;
  }
`;

export const buttonContainer = css`
  ${isMobile} {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-top: 1.2rem;
  }
`;

export const about = css`
  background: none;
  border: 0;
  margin-right: 2rem;
  padding: 0.4rem 1.2rem;
  ${isDesktop} {
    padding: 0.6rem 1.8rem;
  }
`;

export const heading = css`
  font-weight: 300;
`;
