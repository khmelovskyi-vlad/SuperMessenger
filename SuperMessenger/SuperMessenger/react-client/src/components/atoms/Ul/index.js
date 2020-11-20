import React from 'react'

import styles from './style.module.css'

export default function Ul(props) {
  const className = [props.className, styles[props.size]]
  return (
    <ul
      className={className.join(" ")}
    >
      {props.children}
    </ul>
  )
}