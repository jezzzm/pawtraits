import React, { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as styles from './modal.style';
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

export default function Modal({
  index,
  setIndex,
  isOpen,
  setIsOpen,
  children,
}) {
  const { size } = useWindowSize();
  const content =
    children.length && typeof children === 'object' ? children : [children];

  const previous = useCallback(() => {
    index > 0 ? setIndex((prev) => prev - 1) : setIndex(content.length - 1);
  }, [index, setIndex, content.length]);

  const next = useCallback(() => {
    index + 1 < content.length ? setIndex((prev) => prev + 1) : setIndex(0);
  }, [index, setIndex, content.length]);

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

    if (info.velocity.x < -1000 || info.offset.x < -1 * widthThreshhold) {
      next();
    } else if (info.velocity.x > 1000 || info.offset.x > widthThreshhold) {
      previous();
    }
  };

  return (
    isOpen && (
      <div
        css={styles.modal}
        style={{ height: size.height, width: size.width }}
      >
        <div css={styles.header}>
          <button onClick={() => setIsOpen(false)} css={styles.close}>
            Close
          </button>
        </div>
        <motion.div
          css={styles.content}
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
