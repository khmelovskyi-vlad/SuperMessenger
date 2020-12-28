import React from 'react'

import styles from './style.module.css'

export default function Select({
  className,
  size,
  onChange,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <select
      className={classNames.join(" ")}
      onChange={onChange}
    >
      {children}
    </select>
  )
}