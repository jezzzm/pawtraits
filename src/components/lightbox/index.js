import React, { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as styles from './lightbox.style';
import useWindowWidth from '../../utils/use-window-width';
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
  const width = useWindowWidth();

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
      const widthThreshhold = (2 * width) / 3;

      if (info.velocity.x < -1500 || info.offset.x < -1 * widthThreshhold) {
        next();
      } else if (info.velocity.x > 1500 || info.offset.x > widthThreshhold) {
        previous();
      }
    };
    return (
      isOpen && (
        <div css={styles.lightbox(styleOverride)}>
          <button onClick={() => setIsOpen(false)} css={styles.close}>
            Close
          </button>
          <motion.div
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
  }, [index, isOpen, nodes, styleOverride, setIsOpen, width, next, previous]);

  return [Lightbox, setIndex, setIsOpen];
}
