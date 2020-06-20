import React from 'react';

export default function Picture({
  src,
  srcSet,
  srcSetWebp,
  sizes,
  alt,
  draggable = false,
}) {
  return (
    <picture>
      <source srcSet={srcSetWebp} sizes={sizes} type="image/webp" />
      <source srcSet={srcSet} sizes={sizes} type="image/png" />
      <img alt={alt} src={src} loading="lazy" draggable={draggable} />
    </picture>
  );
}
