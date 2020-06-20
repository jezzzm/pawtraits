import React, { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as styles from './modal.style';
import * as shared from '../../styles/shared.style';
import useWindowSize from '../../utils/use-window-size';

export default function Modal({
  index,
  setIndex,
  isOpen,
  setIsOpen,
  screens,
  Wrapper = ({ children }) => <div>{children}</div>,
}) {
  const { size } = useWindowSize();
  const content =
    screens.length && typeof screens === 'object' ? screens : [screens];

  const previous = useCallback(() => {
    index > 0 ? setIndex((prev) => prev - 1) : setIndex(content.length - 1);
  }, [index, setIndex, content.length]);

  const next = useCallback(() => {
    index + 1 < content.length ? setIndex((prev) => prev + 1) : setIndex(0);
  }, [index, setIndex, content.length]);

  useEffect(() => {
    const keyListener = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', keyListener);

    return () => window.removeEventListener('keydown', keyListener);
  }, [setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: size.height }}
          animate={{ y: 0 }}
          exit={{ y: size.height }}
          transition={{ damping: 500 }}
          css={styles.modal}
          style={{ height: size.height, width: size.width }}
        >
          <div css={styles.header}>
            <button
              onClick={() => setIsOpen(false)}
              css={[styles.close, shared.ctaButton('neutral')]}
            >
              Close
            </button>
          </div>
          <Wrapper next={next} previous={previous} width={size.width}>
            {content[index]}
          </Wrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
