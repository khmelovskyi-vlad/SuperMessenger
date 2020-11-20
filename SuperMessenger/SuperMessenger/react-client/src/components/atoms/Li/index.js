import React from 'react'

import styles from './style.module.css'

export default function Li(props) {
  const className = [props.className, styles[props.size]]
  return (
    <li
      className={className.join(" ")}
    >
      {props.children}
    </li>
  )
}