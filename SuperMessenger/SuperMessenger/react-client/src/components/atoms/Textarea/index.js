import React from 'react'

import styles from './style.module.css'

export default function Textarea(props) {
  const className = [props.className, styles[props.size]]
  return (
    <textarea
      className={className.join(" ")}
      rows={props.rows}
      maxLength={props.maxLength}
      type={props.type}
      name={props.name}
      onChange={props.onChange}
    >
      {props.children}
    </textarea>
  )
}