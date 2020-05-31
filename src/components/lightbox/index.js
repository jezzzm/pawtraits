import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { css } from '@emotion/core';

const lightbox = (styleOverride) => css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  ${styleOverride
    ? css`
        ${styleOverride}
      `
    : css`
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
`;

const close = css`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
`;

const bodyNoScroll = (enabled) =>
  enabled &&
  css`
    overflow: hidden;
  `;

export default function useLightbox(nodes, styleOverride = null) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const fullWidth = useRef(document.body.scrollWidth);

  const previous = () => index > 0 && setIndex(index - 1);
  const next = () => index + 1 < nodes.length && setIndex(index + 1);

  const Lightbox = () =>
    isOpen && (
      <div css={lightbox(styleOverride)}>
        <button onClick={() => setIsOpen(false)} css={close}>
          Close
        </button>
        {nodes[index]}
      </div>
    );

  useLayoutEffect(() => {
    const width = document.body.scrollWidth;
    if (isOpen) {
      const padding = fullWidth.current - width;
      document.body.style.cssText = `overflow: hidden; padding-right: ${padding}px; height: 100%;`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.height = '';
      fullWidth.current = width;
    }
  }, [isOpen]);

  useEffect(() => {
    const keyListener = (event) => {
      console.log(index, index + 1);
      if (event.key === 'ArrowRight') {
        next();
      } else if (event.key === 'ArrowLeft') {
        previous();
      } else if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', keyListener);

    return () => window.removeEventListener('keydown', keyListener);
  }, []);

  return [Lightbox, setIndex, setIsOpen];
}
