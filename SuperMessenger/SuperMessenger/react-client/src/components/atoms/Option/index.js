import React from 'react'

import styles from './style.module.css'

export default function Option(props) {
  const className = [props.className, styles[props.size]]
  return (
    <option
      className={className.join(" ")}
      value={props.value}
    >
      {props.children}
    </option>
  )
}