import React from 'react';

export default function ButtonOrDiv({ type, children, onClick, ...restProps }) {
  return type === 'button'
    ? <button {...restProps} onClick={onClick} >{children}</button>
    : <div {...restProps}>{children}</div>
}