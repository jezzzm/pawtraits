import React from 'react';
import * as shared from '../../styles/shared.style';
import * as styles from './button-wrapper.style.js';
import Spinner from '../spinner';

export default function ButtonWrapper({
  currentPage,
  numPages,
  onPrevious,
  onNext,
  onSubmit,
  isLoading,
}) {
  const hasPrevious = currentPage > 0;
  const hasSubmit = currentPage === numPages - 2;
  return (
    <div css={styles.buttonWrapper}>
      {hasPrevious ? (
        <button
          type="button"
          onClick={onPrevious}
          css={[shared.ctaButton('info'), styles.formButton('right')]}
        >
          Previous
        </button>
      ) : (
        <div css={[styles.formButton('right')]} />
      )}
      {hasSubmit ? (
        <button
          type="submit"
          css={[shared.ctaButton(), styles.formButton('left')]}
          onClick={onSubmit}
        >
          {isLoading ? <Spinner size="22px" /> : 'Submit'}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          css={[shared.ctaButton('successLight'), styles.formButton('left')]}
        >
          Next
        </button>
      )}
    </div>
  );
}
