import { css } from '@emotion/core';
import { colours } from '../../styles/shared.style';

export const container = twoPets => css`
  display: grid;
  outline: 1px solid ${colours.copy};
  width: 100%;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas:
    "A4 A4 A5 A5 A2 A2 A2 A2"
    "A4 A4 nil ${!twoPets ? 'A6' : 'nil'} A2 A2 A2 A2"
    "A3 A3 A3 A3 A2 A2 A2 A2"
    "A3 A3 A3 A3 A2 A2 A2 A2";

  grid-gap: 1px;
  background: ${colours.copy};
  margin-bottom: 2.4rem;

`;

export const rect = (size, hovering, selected) => {
  let colour = 'white';

  if (size === selected) {
    colour = colours.successLight;
  }
  if (size === hovering) {
    colour = colours.info;
  }

  return css`
    grid-area: ${size};
    background: ${colour};
    border: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s all;

    &:hover {
      background: ${colours.info};
    }
    &:active {
      background: ${colours.successLight};
    }

`;
};
