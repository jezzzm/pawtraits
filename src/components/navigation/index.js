import React from 'react';
import { Link } from 'gatsby';
import { useRecoilState } from 'recoil';
import * as styles from './navigation.style';
import formOpen from '../../recoil/form-open';
import Picture from '../picture';
import useWindowSize from '../../utils/use-window-size';
import NavButtons from './nav-buttons';

export default function Navigation({ logo }) {
  const { title, fluid: img } = logo;
  const { isMobile } = useWindowSize();

  const [, setFormOpen] = useRecoilState(formOpen);

  return (
    <nav id="header" css={styles.outer}>
      <div css={styles.inner}>
        {isMobile ? (
          <Link to="/" css={styles.link} activeClassName="active">
            <span>Home</span>
          </Link>
        ) : (
          <Link to="/" css={styles.logo}>
            <Picture
              src={img.src}
              srcSet={img.srcSet}
              srcSetWebp={img.srcSetWebp}
              alt={title}
              sizes={img.sizes}
            />
          </Link>
        )}
        <NavButtons isMobile={isMobile} onCTAClick={() => setFormOpen(true)} />
      </div>
    </nav>
  );
}
