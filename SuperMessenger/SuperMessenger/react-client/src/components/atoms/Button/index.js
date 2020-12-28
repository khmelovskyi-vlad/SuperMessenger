import React from 'react'

import styles from './style.module.css'

export default function Button({
  className,
  size,
  id,
  onClick,
  type,
  toggle,
  target,
  controls,
  expanded,
  label,
  disabled,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <button
      className={classNames.join(" ")}
      id={id}
      onClick={onClick}
      type={type}
      data-toggle={toggle}
      data-target={target}
      aria-controls={controls}
      aria-expanded={expanded}
      aria-label={label}
      disabled={disabled}
    >
      {children}
    </button>
  )
}