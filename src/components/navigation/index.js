import React from 'react';
import { useRecoilState } from 'recoil';
import * as styles from './navigation.style';
import useWindowSize from '../../utils/use-window-size';
import formOpen from '../../recoil/form-open';

export default function Navigation() {
  const { isMobile } = useWindowSize();
  const [, setFormOpen] = useRecoilState(formOpen);

  const handleOwnClick = () => {
    setFormOpen(() => true);
  };

  return (
    <div css={styles.outer}>
      <div css={styles.inner}>
        {!isMobile && <h2>Sydney Pawtraits</h2>}
        <div>
          <button css={styles.button} onClick={handleOwnClick}>
            Get Your Own
          </button>
        </div>
      </div>
    </div>
  );
}
