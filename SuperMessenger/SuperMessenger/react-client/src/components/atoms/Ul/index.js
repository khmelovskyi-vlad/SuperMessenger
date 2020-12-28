import React from 'react'

import styles from './style.module.css'

export default function Ul({
  className,
  size,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <ul
      className={classNames.join(" ")}
    >
      {children}
    </ul>
  )
}