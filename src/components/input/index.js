import React, { forwardRef } from 'react';
import Textarea from 'react-autosize-textarea';
import * as styles from './input.style';

const Input = forwardRef(
  (
    {
      name,
      label = name,
      placeholder = name,
      error = '',
      type = 'input',
      onChange,
      onBlur,
    },
    ref
  ) => {
    const hasError = error?.message?.length > 0;
    const isCheckbox = type === 'checkbox';
    const isTextarea = type === 'textarea';
    return (
      <label css={styles.label}>
        <div css={styles.labelTitleContainer}>
          <h4 css={styles.text(isCheckbox)}>{label}</h4>
          <span css={styles.required(hasError)}>Required</span>
        </div>
        {isTextarea ? (
          <Textarea
            name={name}
            /* needs update to dep to prevent warning in console */
            /* https://github.com/buildo/react-autosize-textarea/pull/142 */
            inputref={ref}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            css={styles.input({ hasError, isTextarea: true })}
            rows={3}
          />
        ) : (
          <input
            name={name}
            ref={ref}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            css={styles.input({ hasError, isCheckbox })}
          />
        )}
        {hasError && <span css={styles.error}>{error.message}</span>}
      </label>
    );
  }
);

export default Input;
