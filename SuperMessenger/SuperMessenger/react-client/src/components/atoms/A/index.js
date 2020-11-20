import React from 'react'

import styles from './style.module.css'

export default function A(props) {
  const className = [props.className, styles[props.size]]
  return (
    <a
      className={className.join(" ")}
      href={props.href}
    >
      {props.children}
    </a>
  )
}