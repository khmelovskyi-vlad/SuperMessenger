import React from 'react'

import styles from './style.module.css'

export default function Nav(props) {
  const className = [props.className, styles[props.size]]
  return (
    <nav
      className={className.join(" ")}
      style={props.style}
    >
      {props.children}
    </nav>
  )
}