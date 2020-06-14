import React, { useCallback, useEffect } from 'react';
import * as styles from './modal.style';
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
        <Wrapper next={next} previous={previous} width={size.width}>
          {content[index]}
        </Wrapper>
      </div>
    )
  );
}
