import { css } from '@emotion/core';
import { isMobile, isDesktop } from '../../utils/breakpoints';
import { colours } from '../../styles/shared.style';

export const outer = css`
  position: fixed;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);

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
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  ${isMobile} {
    margin-bottom: 2rem;
    margin-top: 1.2rem;
    align-items: baseline;
  }
  ${isDesktop} {
    align-items: center;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  a {
    text-decoration: none;
    font-family: Rubik;
    font-weight: 300;
  }
`;

export const buttonContainer = css`
  ${isMobile} {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-top: 1.2rem;
    flex: 1;
  }

  ${isDesktop} {
    button {
      padding: 0.8rem 1.8rem;
    }
  }
`;

export const link = css`
  padding: 0.4rem 0;
  text-decoration: none;

  ${isDesktop} {
    margin-right: 2rem;
    padding: 0.8rem 1.8rem;
  }

  &.active span {
    border-bottom: 3px solid ${colours.copy};
    padding-bottom: 0.4rem;
  }
`;

export const logo = css`
  display: block;
  height: 75%;
  margin: 1rem 0;
  img {
    display: block;
    height: 100%;
  }
`;
