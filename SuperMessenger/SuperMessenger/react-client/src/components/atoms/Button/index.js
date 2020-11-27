import React from 'react'

import styles from './style.module.css'

export default function Button(props) {
  const className = [props.className, styles[props.size]]
  return (
    <button
      className={className.join(" ")}
      id={props.id}
      onClick={props.onClick}
      type={props.type}
      data-toggle={props.toggle}
      data-target={props.target}
      aria-controls={props.controls}
      aria-expanded={props.expanded}
      aria-label={props.label}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}