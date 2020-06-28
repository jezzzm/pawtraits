import { css } from '@emotion/core';

export const inner = css`
  max-width: 600px;
`;

export const title = css`
  text-align: center;
`;
export const image = css`
  display: block;
  max-width: 360px;
  width: 100%;
  margin 2rem auto;
`;

export const copy = css`
  p {
    margin-top: 0.8rem;
    margin-bottom: 2rem;
  }
  h4 {
    margin-bottom: 0.8rem;
  }
`;

export const button = css`
  display: block;
  margin: 4rem auto;
`;

export const hi = css`
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

export const copyright = css`
  font-size: 0.8rem;
  text-align: center;
`;
