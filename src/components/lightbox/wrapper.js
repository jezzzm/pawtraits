import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import * as styles from './lightbox.style';

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

export default function LightboxWrapper({ previous, next, width, children }) {
  const handleDragEnd = async (event, info) => {
    const widthThreshhold = width / 2;

    if (info.velocity.x < -1000 || info.offset.x < -1 * widthThreshhold) {
      next();
    } else if (info.velocity.x > 1000 || info.offset.x > widthThreshhold) {
      previous();
    }
  };

  useEffect(() => {
    const keyListener = (event) => {
      if (event.key === 'ArrowRight') {
        next();
      } else if (event.key === 'ArrowLeft') {
        previous();
      }
    };

    window.addEventListener('keydown', keyListener);

    return () => window.removeEventListener('keydown', keyListener);
  }, [previous, next]);

  return (
    <motion.div
      css={styles.content}
      variants={variants}
      drag="x"
      dragDirectionLock
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onDragStart={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
}
