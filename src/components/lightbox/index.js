import React, {
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import * as styles from './lightbox.style';

export default function useLightbox(nodes, styleOverride = null) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const fullWidth = useRef(document.body.scrollWidth);

  const previous = useCallback(() => {
    index > 0 ? setIndex((prev) => prev - 1) : setIndex(nodes.length - 1);
  }, [index, nodes.length]);

  const next = useCallback(() => {
    index + 1 < nodes.length ? setIndex((prev) => prev + 1) : setIndex(0);
  }, [index, nodes.length]);

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
  }, [index, previous, next]);

  const Lightbox = () =>
    isOpen && (
      <div css={styles.lightbox(styleOverride)}>
        <button onClick={() => setIsOpen(false)} css={styles.close}>
          Close
        </button>
        {nodes[index]}
      </div>
    );

  return [Lightbox, setIndex, setIsOpen];
}
