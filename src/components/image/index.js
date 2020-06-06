import React from 'react';
import { css } from '@emotion/core';

const image = (thumbnail) => css`
  display: block;
  margin: 0 auto;
  width: ${thumbnail ? '200px' : 'auto'};
  height: auto;
  max-height: 100vh;
  max-width: 100vw;
`;

const text = css`
  margin: 0;
  text-align: center;
  align-self: center;
  flex: 1;
`;

const container = (isThumbnail) => css`
  max-height: 100vh;
  max-width: 100vw;
  ${isThumbnail
    ? undefined
    : css`
        display: flex;
        @media (orientation: landscape) {
          flex-direction: row-reverse;
        }

        @media (orientation: portrait) {
          flex-direction: column;
        }
      `}
`;

const imageContainer = css`
  flex: 2;
`;

export default function Image({
  name,
  index,
  isThumbnail,
  onClick,
  ...imgAttribs
}) {
  return (
    <div css={container(isThumbnail)}>
      <div css={imageContainer}>
        <img
          data-index={index}
          css={image(isThumbnail)}
          {...imgAttribs}
          loading="lazy"
          onClick={onClick}
        />
      </div>
      <p css={text}>{name}</p>
    </div>
  );
}
