import React from 'react'

import styles from './style.module.css'

export default function Input({
  className,
  size,
  id,
  onClick,
  onChange,
  type,
  defaultValue,
  placeholder,
  ariaLabel,
  maxLength,
  name,
  style,
  accept,
  multiple,
  children,
}) {
  const classNames = [className, styles[size]]
  return (
    <input
      className={classNames.join(" ")}
      id={id}
      onClick={onClick}
      onChange={onChange}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      aria-label={ariaLabel}
      maxLength={maxLength}
      name={name}
      style={style}
      accept={accept}
      multiple={multiple}
    >
      {children}
    </input>
  )
}