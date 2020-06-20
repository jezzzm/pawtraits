import React from 'react';
import { Link } from 'gatsby';
import { useRecoilState } from 'recoil';
import * as styles from './navigation.style';
import { ctaButton } from '../../styles/shared.style';
import useWindowSize from '../../utils/use-window-size';
import formOpen from '../../recoil/form-open';

export default function Navigation() {
  const { isMobile } = useWindowSize();
  const [, setFormOpen] = useRecoilState(formOpen);

  return (
    <nav id="header" css={styles.outer}>
      <div css={styles.inner}>
        <Link to="/">
          <h2 css={styles.heading}>{isMobile ? 'SP' : 'Sydney Pawtraits'}</h2>
        </Link>
        <div css={styles.buttonContainer}>
          <Link css={styles.info} to="/info">
            More Info
          </Link>
          <button css={ctaButton()} onClick={() => setFormOpen(true)}>
            Get Your Own
          </button>
        </div>
      </div>
    </nav>
  );
}
