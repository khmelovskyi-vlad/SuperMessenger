import React from 'react'

import styles from './style.module.css'

export default function Label(props) {
  const className = [props.className, styles[props.size]]
  return (
    <label
      className={className.join(" ")}
      htmlFor={props.htmlFor}
      value={props.value}
    >
      {props.children}
    </label>
  )
}