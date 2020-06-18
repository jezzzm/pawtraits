import React from 'react';
import { useRecoilState } from 'recoil';
import * as styles from './navigation.style';
import { ctaButton } from '../../styles/shared.style';
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
        {!isMobile && <h2 css={styles.heading}>Sydney Pawtraits</h2>}
        <div css={styles.buttonContainer}>
          <button css={styles.about} onClick={() => setAboutOpen(true)}>
            More Info
          </button>
          <button css={ctaButton()} onClick={() => setFormOpen(true)}>
            Get Your Own
          </button>
        </div>
      </div>
    </div>
  );
}
