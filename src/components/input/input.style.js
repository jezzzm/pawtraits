import { css } from '@emotion/core';

export const input = ({
  hasError,
  isCheckbox = false,
  isTextarea = false,
}) => css`
  padding: 0.6rem 1rem;
  ${!isCheckbox ? `width: 100%` : `margin-left: 0.6rem`};
  border: 1px solid #999;
  border-radius: 0.4rem;
  ${isTextarea && `resize: vertical; overflow: hidden;`}
`;
export const error = css`
  display: block;
  padding: 0.2rem 0 0.2rem 0.4rem;
  margin: 1rem 0 0 1rem;
  line-height: 1.4;
  border-left: 3px solid #ffc7d1;
  color: #ff94a7;
`;
export const text = (isCheckbox) => css`
  display: ${isCheckbox ? 'inline' : 'block'};
  margin: 0.6rem 0;
  font-weight: 400;
`;
export const label = css`
  display: block;
  margin-bottom: 2.4rem;
`;

export const labelTitleContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

export const required = (hasError) => css`
  font-size: 0.8rem;
  font-family: Rubik;
  ${hasError && `color: #ff94a7;`}
`;
