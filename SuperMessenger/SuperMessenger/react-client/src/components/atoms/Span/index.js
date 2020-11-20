import React from 'react'

import styles from './style.module.css'

export default function Span(props) {
  const className = [props.className, styles[props.size]]
  return (
    <span
      className={className.join(" ")}
      style={props.syle}
    >
      {props.children}
    </span>
  )
}