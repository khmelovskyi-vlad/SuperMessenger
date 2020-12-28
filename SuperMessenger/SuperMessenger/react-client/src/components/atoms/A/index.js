import React from 'react'

import styles from './style.module.css'

export default function A({
  className,
  size,
  href,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <a
      className={classNames.join(" ")}
      href={href}
    >
      {children}
    </a>
  )
}