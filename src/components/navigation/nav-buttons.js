import React, { useCallback } from 'react';
import { Link } from 'gatsby';
import * as styles from './navigation.style';
import * as shared from '../../styles/shared.style';

export default function NavButtons({ isMobile, onCTAClick }) {
  const buttons = useCallback(() => (
    <>
      <Link css={styles.link} to="/info" activeClassName="active">
        <span>More Info</span>
      </Link>
      {/* <Link css={styles.link} to="/faq" activeClassName="active">
        <span>FAQ</span>
      </Link> */}
      <button type="button" css={shared.ctaButton()} onClick={onCTAClick}>
        {isMobile ? 'Buy' : 'Get your own'}
      </button>
    </>
  ), [isMobile, onCTAClick]);

  return isMobile ? buttons() : (<div css={styles.buttonContainer}>{buttons()}</div>);
}
