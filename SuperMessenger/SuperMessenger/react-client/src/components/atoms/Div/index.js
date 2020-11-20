import React, {forwardRef} from 'react'

import styles from './style.module.css'


export default forwardRef(function Div(props, ref) {
  const className = [props.className, styles[props.size]]
  return (
    <div
      id={props.id}
      className={className.join(" ")}
      ref={ref}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}
)