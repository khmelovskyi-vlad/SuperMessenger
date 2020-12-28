import React from 'react'

import styles from './style.module.css'

export default function Nav({
  className,
  size,
  style,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <nav
      className={classNames.join(" ")}
      style={style}
    >
      {children}
    </nav>
  )
}