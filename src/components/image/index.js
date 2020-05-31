import React from 'react';
import { css } from '@emotion/core';

const image = (thumbnail) => css`
  display: block;
  margin: 0 auto;
  width: ${thumbnail ? '200px' : 'auto'};
  height: auto;
`;

const text = css`
  margin: 0;
`;

export default function Image({name, index, thumbnail, onClick, ...imgAttribs}) {
  return (
    <div>
      <img
        css={image(thumbnail)}
        data-index={index}
        onClick={onClick}
        {...imgAttribs}
      />
      <p css={text}>{name}</p>
    </div>
  );
}