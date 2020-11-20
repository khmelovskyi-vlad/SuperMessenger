import React from 'react'

import styles from './style.module.css'

export default function Input(props) {
  const className = [props.className, styles[props.size]]
  return (
    <input
      className={className.join(" ")}
      id={props.id}
      onClick={props.onClick}
      onChange={props.onChange}
      type={props.type}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      aria-label={props.ariaLabel}
      maxLength={props.maxLength}
      name={props.name}
      style={props.style}
      accept={props.accept}
    >
      {props.children}
    </input>
  )
}