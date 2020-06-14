import React, { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as styles from './lightbox.style';
import useWindowSize from '../../utils/use-window-size';
import useModalOpen from '../../utils/use-modal-open';

const variants = {
  next: {
    x: '-100%',
    pointerEvents: 'none',
  },
  previous: {
    x: '100%',
    pointerEvents: 'none',
  },
};

export default function useLightbox(nodes, styleOverride = null) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useModalOpen(false);
  const size = useWindowSize();

  const previous = useCallback(() => {
    index > 0 ? setIndex((prev) => prev - 1) : setIndex(nodes.length - 1);
  }, [index, nodes.length]);

  const next = useCallback(() => {
    index + 1 < nodes.length ? setIndex((prev) => prev + 1) : setIndex(0);
  }, [index, nodes.length]);

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
  }, [index, previous, next, setIsOpen]);

  const Lightbox = useCallback(() => {
    const handleDragEnd = async (event, info) => {
      const widthThreshhold = size.width / 2;

      if (info.velocity.x < -1500 || info.offset.x < -1 * widthThreshhold) {
        next();
      } else if (info.velocity.x > 1500 || info.offset.x > widthThreshhold) {
        previous();
      }
    };
    return (
      isOpen && (
        <div css={styles.lightbox(styleOverride)}>
          <div css={styles.closeContainer}>
            <button onClick={() => setIsOpen(false)} css={styles.close}>
              Close
            </button>
          </div>
          <motion.div
            css={styles.contentContainer}
            variants={variants}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            onDragStart={(e) => e.stopPropagation()}
          >
            {nodes[index]}
          </motion.div>
        </div>
      )
    );
  }, [
    index,
    isOpen,
    nodes,
    styleOverride,
    setIsOpen,
    size.width,
    next,
    previous,
  ]);

  return [Lightbox, setIndex, setIsOpen];
}
