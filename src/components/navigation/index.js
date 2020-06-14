import React from 'react';
import { useRecoilState } from 'recoil';
import * as styles from './navigation.style';
import useWindowSize from '../../utils/use-window-size';
import formOpen from '../../recoil/form-open';
import aboutOpen from '../../recoil/about-open';

export default function Navigation() {
  const { isMobile } = useWindowSize();
  const [, setFormOpen] = useRecoilState(formOpen);
  const [, setAboutOpen] = useRecoilState(aboutOpen);

  return (
    <div css={styles.outer}>
      <div css={styles.inner}>
        {!isMobile && <h2>Sydney Pawtraits</h2>}
        <div css={styles.buttonContainer}>
          <button css={styles.about} onClick={() => setAboutOpen(true)}>
            About
          </button>
          <button css={styles.button} onClick={() => setFormOpen(true)}>
            Get Your Own
          </button>
        </div>
      </div>
    </div>
  );
}
