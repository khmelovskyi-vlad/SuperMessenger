import React from 'react'

import styles from './style.module.css'

export default function Form(props) {
  const className = [props.className, styles[props.size]]
  return (
    <form
      className={className.join(" ")}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  )
}