import React from 'react'

import styles from './style.module.css'

export default function Img({
  className,
  size,
  src,
  alt,
  style,
}) {
  const classNames = [className, styles[size]]
  return (
    <img
      className={classNames.join(" ")}
      src={src}
      alt={alt}
      style={style}
    />
  )
}