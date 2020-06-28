import React, { useCallback, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { motion, AnimatePresence } from 'framer-motion';
import * as styles from './modal.style';
import * as shared from '../../styles/shared.style';
import Picture from '../picture';
import useWindowSize from '../../utils/use-window-size';

export default function Modal({
  index,
  setIndex,
  isOpen,
  setIsOpen,
  screens,
  Wrapper = ({ children }) => <div>{children}</div>,
}) {
  const data = useStaticQuery(graphql`
    query ModalLogoQuery {
      logo: contentfulAsset(title: { eq: "spLogo" }) {
        fluid(maxWidth: 200) {
          sizes
          src
          srcSet
          srcSetWebp
        }
        title
      }
    }
  `);

  const { title, fluid: img } = data.logo;

  const { windowSize } = useWindowSize();
  const content = screens.length && typeof screens === 'object' ? screens : [screens];

  const previous = useCallback(() => {
    index > 0 ? setIndex(prev => prev - 1) : setIndex(content.length - 1);
  }, [index, setIndex, content.length]);

  const next = useCallback(() => {
    index + 1 < content.length ? setIndex(prev => prev + 1) : setIndex(0);
  }, [index, setIndex, content.length]);

  useEffect(() => {
    const keyListener = event => {
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
          initial={{ y: windowSize.height }}
          animate={{ y: 0 }}
          exit={{ y: windowSize.height }}
          transition={{ damping: 500 }}
          css={styles.modal}
          style={{ height: windowSize.height, width: windowSize.width }}
        >
          <div css={styles.header}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              css={[styles.close, shared.ctaButton('neutral')]}
            >
              Close
            </button>
            <Picture
              src={img.src}
              srcSet={img.srcSet}
              srcSetWebp={img.srcSetWebp}
              alt={title}
              sizes={img.sizes}
            />
          </div>
          <Wrapper next={next} previous={previous} width={windowSize.width}>
            {content[index]}
          </Wrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
