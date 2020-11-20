import React from 'react'

import styles from './style.module.css'

export default function Select(props) {
  const className = [props.className, styles[props.size]]
  return (
    <select
      className={className.join(" ")}
      onChange={props.onChange}
    >
      {props.children}
    </select>
  )
}