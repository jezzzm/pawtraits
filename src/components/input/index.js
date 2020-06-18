import React, { forwardRef } from 'react';
import Textarea from 'react-autosize-textarea';
import * as styles from './input.style';

const Input = forwardRef(
  (
    {
      name,
      value,
      label = name,
      placeholder = name,
      error = '',
      type = 'input',
    },
    ref
  ) => {
    const hasError = error?.message?.length > 0;
    const isCheckbox = type === 'checkbox';
    const isTextarea = type === 'textarea';
    return (
      <label css={styles.label}>
        <h4 css={styles.text(isCheckbox)}>{label}</h4>
        {isTextarea ? (
          <Textarea
            name={name}
            /*needs update to dep to prevent warning in console */
            inputref={ref}
            defaultValue={value}
            placeholder={placeholder}
            css={styles.input({ hasError, isTextarea: true })}
            rows={3}
          />
        ) : (
          <input
            name={name}
            ref={ref}
            type={type}
            defaultValue={value}
            placeholder={placeholder}
            css={styles.input({ hasError, isCheckbox })}
          />
        )}
        {hasError && <span css={styles.error}>{error.message}</span>}
      </label>
    );
  }
);

export default Input;
