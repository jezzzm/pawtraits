import React, { forwardRef } from 'react';
import * as styles from './input.style';

const Input = forwardRef(({
  name,
  value,
  labelText = name,
  placeholder = name,
  error = '',
  type = "input",
}, ref) => {
  const hasError = error?.message?.length > 0;
  return (
    <label css={styles.label}>
      <span css={styles.text}>{labelText}</span>
      <input
        name={name}
        ref={ref}
        type={type}
        value={value}
        placeholder={placeholder}
        css={styles.input(hasError)}
      />
      {hasError && <span css={styles.error}>{error.message}</span>}
    </label>
  );
});

export default Input;