import React from 'react'

import styles from './style.module.css'

export default function Form({
  className,
  size,
  onSubmit,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <form
      className={classNames.join(" ")}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  )
}