import React from 'react'

import styles from './style.module.css'

export default function Option({
  className,
  size,
  value,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <option
      className={classNames.join(" ")}
      value={value}
    >
      {children}
    </option>
  )
}