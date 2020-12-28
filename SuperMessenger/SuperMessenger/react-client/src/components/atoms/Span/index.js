import React from 'react'

import styles from './style.module.css'

export default function Span({
  className,
  size,
  style,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <span
      className={classNames.join(" ")}
      style={style}
    >
      {children}
    </span>
  )
}