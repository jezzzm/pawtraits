import React from 'react';
import { Link } from 'gatsby';
import { useRecoilState } from 'recoil';
import * as styles from './navigation.style';
import * as shared from '../../styles/shared.style';
import formOpen from '../../recoil/form-open';
import Picture from '../picture';

export default function Navigation({ logo }) {
  const { title, fluid: img } = logo;

  const [, setFormOpen] = useRecoilState(formOpen);

  return (
    <nav id="header" css={styles.outer}>
      <div css={styles.inner}>
        <Link to="/" css={styles.logo}>
          <Picture
            src={img.src}
            srcSet={img.srcSet}
            srcSetWebp={img.srcSetWebp}
            alt={title}
            sizes={img.sizes}
          />
        </Link>
        <div css={styles.buttonContainer}>
          <Link css={styles.info} to="/info">
            More Info
          </Link>
          <button css={shared.ctaButton()} onClick={() => setFormOpen(true)}>
            Get Your Own
          </button>
        </div>
      </div>
    </nav>
  );
}
