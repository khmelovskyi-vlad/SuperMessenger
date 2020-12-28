import React from 'react'

import styles from './style.module.css'

export default function Textarea({
  className,
  size,
  rows,
  maxLength,
  type,
  name,
  onChange,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <textarea
      className={classNames.join(" ")}
      rows={rows}
      maxLength={maxLength}
      type={type}
      name={name}
      onChange={onChange}
    >
      {children}
    </textarea>
  )
}