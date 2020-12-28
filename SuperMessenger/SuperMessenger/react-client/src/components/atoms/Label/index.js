import React from 'react'

import styles from './style.module.css'

export default function Label({
  className,
  size,
  htmlFor,
  value,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <label
      className={classNames.join(" ")}
      htmlFor={htmlFor}
      value={value}
    >
      {children}
    </label>
  )
}