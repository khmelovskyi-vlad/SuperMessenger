import React from 'react'

import styles from './style.module.css'

export default function Title(props) {
  const className = [props.className, styles[props.size]]
  return (
    <h1
      className={className.join(" ")}
    >
      {props.children}
    </h1>
  )
}