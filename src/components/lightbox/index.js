import React, { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as styles from './lightbox.style';
import useWindowSize from '../../utils/use-window-size';

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

export default function Lightbox({
  index,
  setIndex,
  isOpen,
  setIsOpen,
  content,
}) {
  const size = useWindowSize();

  const previous = useCallback(() => {
    index > 0 ? setIndex((prev) => prev - 1) : setIndex(content.length - 1);
  }, [index, content.length]);

  const next = useCallback(() => {
    index + 1 < content.length ? setIndex((prev) => prev + 1) : setIndex(0);
  }, [index, content.length]);

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
      <div css={styles.lightbox}>
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
          {content[index]}
        </motion.div>
      </div>
    )
  );
}
