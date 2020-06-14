import { css } from '@emotion/core';
import { isDesktop } from '../../utils/breakpoints';

export const outer = css`
  position: absolute;
  top: 4rem;
  bottom: 0;
  overflow: auto;
  width: 100%;
  ${isDesktop} {
    top: 6rem;
  }
`;

export const inner = css`
  max-width: 600px;
  margin: 0 auto 8rem;
  padding: 0 1rem;
`;

export const title = css`
  text-align: center;
`;
export const image = css`
  display: block;
  max-width: 360px;
  width: 100%;
  margin 4rem auto;
`;

export const copy = css``;

export const button = css`
  display: block;
  margin: 2rem auto;
`;

export const hi = css`
  border-top: 1px solid currentColor;
  text-align: center;
  padding: 4rem 0;
  margin: 4rem auto 0;
`;
export const email = css`
  text-align: center;
  display: block;
  font-size: 20px;
  margin-bottom: 4rem;
`;
export const socials = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const icon = css`
  width: 2rem;
  height: 2rem;
  display: block;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  &:first-of-type {
    margin-right: 1rem;
  }
`;
