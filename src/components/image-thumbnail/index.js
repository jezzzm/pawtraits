import React from 'react';
import ButtonOrDiv from './button-or-div';
import * as styles from './image.style';

export default function Image({
  name,
  index,
  isThumbnail,
  onClick,
  ...imgAttribs
}) {
  return (
    <div css={styles.wrapper(isThumbnail)}>
      <ButtonOrDiv
        type={isThumbnail ? 'button' : 'div'}
        onClick={onClick}
        css={styles.imageContainer(isThumbnail)}
      >
        <img
          data-index={index}
          css={styles.image(isThumbnail)}
          {...imgAttribs}
          loading="lazy"
          draggable={false}
        />
        <div css={styles.textContainer(isThumbnail)}>
          {isThumbnail ? <p>{name}</p> : <h1>{name}</h1>}
        </div>
      </ButtonOrDiv>
    </div>
  );
}
