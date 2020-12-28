import React from 'react'

import styles from './style.module.css'

export default function Li({
  className,
  size,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <li
      className={classNames.join(" ")}
    >
      {children}
    </li>
  )
}