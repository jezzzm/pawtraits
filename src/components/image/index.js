import React, { Fragment } from 'react';
import * as styles from './image.style';

export default function Image({ name, alt, src, srcset, sizes }) {
  return (
    <Fragment>
      <div css={styles.info}>
        <h1>{name}</h1>
      </div>
      <div css={styles.imageContainer}>
        <img
          css={styles.image}
          alt={alt}
          src={src}
          srcSet={srcset}
          sizes={sizes}
          loading="lazy"
          draggable={false /*make conditional mobile/desktop*/}
        />
      </div>
    </Fragment>
  );
}
