import { css } from '@emotion/core';

export const input = ({
  isTextarea = false,
  isCheckboxOrRadio = false,
}) => css`
  padding: 0.6rem 1rem;
  ${isCheckboxOrRadio ? 'margin-left: 0.6rem' : 'width: 100%'};
  border: 1px solid #999;
  border-radius: 0.4rem;
  ${isTextarea && 'resize: vertical; overflow: hidden;'}
`;

export const text = isCheckboxOrRadio => css`
  display: ${isCheckboxOrRadio ? 'inline' : 'block'};
  margin: 0.6rem 0;
  font-weight: 400;
`;
export const label = isCheckboxOrRadio => css`
margin-bottom: 2.4rem;
${
  isCheckboxOrRadio
    ? css`
        display: flex;
      `
    : css`
        display: block;
      `
}
}`;

export const labelTitleContainer = isCheckboxOrRadio => css`
  ${!isCheckboxOrRadio
  && css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  `}
`;

export const required = hasError => css`
  font-size: 0.8rem;
  font-family: Rubik;
  ${hasError && 'color: #ff94a7;'}
`;
