import React, { useCallback, useRef } from 'react';
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom';
import * as styles from './image.style';

export default function Image({ name, alt, src, srcSet, srcSetWebp, sizes }) {
  const imgRef = useRef();
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;

    if (img) {
      const value = make3dTransformValue({ x, y, scale });

      img.style.setProperty('transform', value);
    }
  }, []);
  return (
    <>
      <div css={styles.info}>
        <h1>{name}</h1>
      </div>
      <div css={styles.imageContainer}>
        <QuickPinchZoom onUpdate={onUpdate}>
          <picture css={styles.image}>
            <source srcSet={srcSetWebp} sizes={sizes} type="image/webp" />
            <source srcSet={srcSet} sizes={sizes} type="image/png" />
            <img
              ref={imgRef}
              alt={alt}
              src={src}
              loading="lazy"
              draggable
            />
          </picture>
        </QuickPinchZoom>
      </div>
    </>
  );
}
