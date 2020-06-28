import React from 'react';
import * as styles from './image.style';

export default function Image({ name, alt, src, srcSet, srcSetWebp, sizes }) {
  return (
    <>
      <div css={styles.info}>
        <h1>{name}</h1>
      </div>
      <div css={styles.imageContainer}>
        <picture css={styles.image}>
          <source srcSet={srcSetWebp} sizes={sizes} type="image/webp" />
          <source srcSet={srcSet} sizes={sizes} type="image/png" />
          <img
            alt={alt}
            src={src}
            loading="lazy"
            draggable={false /*make conditional mobile/desktop*/}
          />
        </picture>
      </div>
    </>
  );
}
