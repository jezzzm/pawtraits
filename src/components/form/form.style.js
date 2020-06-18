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

export const page = (index) => css`
  width: 100vw;
  padding: 0 1rem;
  position: absolute;
  overflow-y: auto;
  left: calc(${index} * 100vw);
  bottom: 4rem;
  top: 0;
  ${isDesktop} {
    top: 6rem;
  }
  * {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;
