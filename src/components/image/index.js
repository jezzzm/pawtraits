import React from 'react';
import * as styles from './image.style';
import useWindowSize from '../../utils/use-window-size';

export default function Image({ name, alt, src, srcSet, srcSetWebp, sizes }) {
  const { isMobile } = useWindowSize();
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
            draggable={isMobile}
          />
        </picture>
      </div>
    </>
  );
}
