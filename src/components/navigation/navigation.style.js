import { css } from '@emotion/core';
import { isMobile, isDesktop } from '../../utils/breakpoints';

export const outer = css`
  position: fixed;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  padding: 0 2rem;
  height: 4rem;
  ${isDesktop} {
    top: 0;
    height: 6rem;
  }

  ${isMobile} {
    bottom: 0;
  }
`;

export const inner = css`
  height: 100%;

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
    align-items: center;
  }
`;

export const button = css`
  background: #268e46;
  border: 0;
  padding: 0.4rem 1.2rem;
  border-radius: 0.4rem;
  color: white;
  ${isDesktop} {
    padding: 0.6rem 1.8rem;
  }
`;

export const about = css`
  background: none;
  border: 0;
  margin-right: 2rem;
`;
