import React from 'react'

import styles from './style.module.css'

export default function Title({
  className,
  size,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <h1
      className={classNames.join(" ")}
    >
      {children}
    </h1>
  )
}