import React from 'react'

import styles from './style.module.css'

export default function Img(props) {
  const className = [props.className, styles[props.size]]
  return (
    <img
      src={props.src}
      alt={props.alt}
      className={className.join(" ")}
    />
  )
}