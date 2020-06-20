import React, { forwardRef } from 'react';
import Textarea from 'react-autosize-textarea';
import * as styles from './input.style';
import ErrorMessage from './error-message';

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
      required = false,
      childKey = undefined,
    },
    ref
  ) => {
    const hasError = error?.message?.length > 0;
    const isCheckboxOrRadio = type === 'checkbox' || type === 'radio';
    const isTextarea = type === 'textarea';
    const isRadio = type === 'radio';
    return (
      <label css={styles.label(isCheckboxOrRadio)}>
        <div css={styles.labelTitleContainer(isCheckboxOrRadio)}>
          <h4 css={styles.text(isCheckboxOrRadio)}>{label}</h4>
          {required && <span css={styles.required(hasError)}>Required</span>}
        </div>
        {isTextarea ? (
          <Textarea
            key={childKey ? `${childKey}-input` : undefined}
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
            key={childKey ? `${childKey}-input` : undefined}
            name={name}
            ref={ref}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            css={styles.input({ hasError, isCheckboxOrRadio })}
          />
        )}
        <ErrorMessage error={error} />
      </label>
    );
  }
);

export default Input;
