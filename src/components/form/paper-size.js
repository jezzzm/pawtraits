import React, { useRef } from 'react';
import * as styles from './paper-size.style';

const ratio = 420 / 594;
export default function PaperSize({ selected, hovering, twoPets = false, onPaperClick, onHoverChange }) {
  const ref = useRef();
  const width = ref.current ? ref.current.getBoundingClientRect().width : 0;

  return (
    <div css={styles.container(twoPets)} id="A1" ref={ref} style={{ height: width * ratio }}>
      {['A2', 'A3', 'A4', 'A5', 'A6'].map(size => !(size === 'A6' && twoPets) && (
        <button
          type="button"
          id={size}
          onClick={() => onPaperClick(size)}
          key={size}
          css={styles.rect(size, hovering, selected)}
          onMouseEnter={() => onHoverChange(size)}
          onMouseLeave={() => onHoverChange(null)}
        >
          <span>{size}</span>
        </button>
      ))}
    </div>
  );
}
