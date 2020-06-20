import { css } from '@emotion/core';
import { isDesktop } from '../../utils/breakpoints';

export const wrapper = (numPages) => css`
  width: calc(${numPages} * 100vw);
  overflow: hidden;
`;

export const form = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
`;

export const page = (index, isSuccessPage = false) => css`
  width: 100vw;
  padding: 0 1rem;
  position: absolute;
  overflow-y: auto;
  left: calc(${index} * 100vw);
  bottom: ${isSuccessPage ? 0 : '4rem'};
  top: 0;
  ${isDesktop} {
    top: 6rem;
  }
  > * {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const tips = css`
  background: #fff5c7;
  padding: 1rem;
  margin-bottom: 2.4rem;
  ul {
    padding-left: 1.1rem;
  }
  li {
    font-weight: 400;
    line-height: 1.45;
  }
  ${isDesktop} {
    padding: 2rem;
  }
`;

export const price = css`
  padding-top: 0.6rem;
`;

export const success = css`
  text-align: center;
  img {
    display: block;
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
  }
  p {
    // line-height: 1.4;
    font-size: 1.2em;
  }
  button {
    margin: 4rem auto;
    font-size: 2rem;
  }
`;
