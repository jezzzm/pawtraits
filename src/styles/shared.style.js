import { css } from '@emotion/core';
import { isDesktop } from '../utils/breakpoints';

export const ctaButton = (type = 'success') => {
  let bgColor;
  let color;
  switch (type) {
    case 'neutral':
      bgColor = '#efeeee';
      break;
    case 'info':
      bgColor = `#FFF5C7`;
      color = '#222';
      break;
    case 'successLight':
      bgColor = '#edffc7';
      color = '#222';
      break;
    case 'success':
    default:
      bgColor = `#D1FFC7`;
      color = '#222';
  }

  return css`
    background: ${bgColor};
    border: 0;
    border-radius: 0.4rem;
    color: ${color};
    padding: 0.4rem 1.2rem;
    font-family: Rubik;
    font-weight: 400;
    box-shadow: 2px 2px rgba(0, 0, 0, 0.9);
    transition: 0.08s;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 rgba(0, 0, 0, 0.9);
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
