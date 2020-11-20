import React from 'react'

import styles from './style.module.css'

export default function Sub(props) {
  const className = [styles[props.size]]
  return (
    <sub className={className.join(" ")}>
      {props.children}
    </sub>
  )
}