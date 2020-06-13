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
        />
      </ButtonOrDiv>
      <p css={styles.text(isThumbnail)}>{name}</p>
    </div>
  );
}
