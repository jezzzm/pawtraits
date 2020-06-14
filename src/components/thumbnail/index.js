import React from 'react';
import * as styles from './thumbnail.style';

export default function Thumbnail({ name, onClick, alt, src, srcset, sizes }) {
  return (
    <button type={'button'} onClick={onClick} css={styles.button}>
      <img
        css={styles.thumbnail}
        alt={alt}
        src={src}
        srcSet={srcset}
        sizes={sizes}
        loading="lazy"
      />
      <div css={styles.textContainer}>
        <p>{name}</p>
      </div>
    </button>
  );
}
