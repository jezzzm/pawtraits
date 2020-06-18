import { css } from '@emotion/core';
import { isDesktop } from '../utils/breakpoints';

export const ctaButton = (type = 'success') => {
  let bgColor;
  switch (type) {
    case 'info':
      bgColor = `#E396CB`;
      break;
    case 'success':
    default:
      bgColor = `#268e46`;
  }
  return css`
    background: ${bgColor};
    border: 0;
    border-radius: 0.4rem;
    color: white;
    padding: 0.4rem 1.2rem;
    ${isDesktop} {
      padding: 0.6rem 1.8rem;
    }
  `;
};

export const modalContentScrollable = css`
  position: absolute;
  top: 4rem;
  bottom: 0;
  overflow-y: auto;
  width: 100%;
  ${isDesktop} {
    top: 6rem;
  }
`;

export const modalInnerWrapper = css`
  margin: 0 auto 8rem;
  padding: 0 1rem;
`;
