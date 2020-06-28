import React from 'react';
import * as styles from './thumbnail.style';

export default function Thumbnail({
  name,
  onClick,
  alt,
  src,
  srcSet,
  srcSetWebp,
  sizes,
}) {
  return (
    <button type="button" onClick={onClick} css={styles.button}>
      <picture css={styles.thumbnail}>
        <source srcSet={srcSetWebp} sizes={sizes} type="image/webp" />
        <source srcSet={srcSet} sizes={sizes} type="image/png" />
        <img
          css={styles.thumbnail}
          alt={alt}
          src={src}
          loading="lazy"
          draggable={false /*make conditional mobile/desktop*/}
        />
      </picture>
      <div css={styles.textContainer}>
        <p>{name}</p>
      </div>
    </button>
  );
}
