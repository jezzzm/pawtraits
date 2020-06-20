import { css } from '@emotion/core';
import { isDesktop } from '../utils/breakpoints';

export const gallery = css`
  column-gap: 24px;
  columns: auto 12rem;
`;

export const hero = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column-reverse;
  width: 100%;
  margin-bottom: 2rem;

  h1 {
    font-weight: 300;
    font-size: 2rem;
    background: #fff5c7;
    padding: 0.6rem 1.8em;
  }

  picture {
    max-width: 33%;
  }
  img {
    display: block;
    max-width: 100%;
  }
  ${isDesktop} {
    flex-direction: row;
    margin-bottom: 4rem;
    h1 {
      font-size: 3rem;
    }
  }
`;
