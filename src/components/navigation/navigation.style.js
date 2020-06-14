import { css } from '@emotion/core';
import { isMobile, isDesktop } from '../../utils/breakpoints';

export const navigation = css`
  position: fixed;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  ${isDesktop} {
    top: 0;
    height: 64px;
  }

  ${isMobile} {
    bottom: 0;
    height: 48px;
  }
`;

export const button = css`
  background: #268e46;
  border: 0;
  padding: 0.4rem 1.2rem;
  border-radius: 0.4rem;
  color: white;
`;
