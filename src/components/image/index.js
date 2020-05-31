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
  text-align: center;
`;

export default function Image({name, index, thumbnail, onClick, ...imgAttribs}) {
  return (
    <div onClick={onClick}>
      <img data-index={index} css={image(thumbnail)} {...imgAttribs} />
      <p css={text}>{name}</p>
    </div>
  );
}