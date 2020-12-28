import React from 'react'

import styles from './style.module.css'

export default function Sub({
  size,
  children,
}) {
  const classNames = [styles[size]]
  return (
    <sub className={classNames.join(" ")}>
      {children}
    </sub>
  )
}