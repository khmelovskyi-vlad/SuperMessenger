import React from 'react'
import Div from '../../atoms/Div'

import styles from './style.module.css'

export default function Loader(props) {
  const className = [props.className, styles["lds-hourglass"], styles[props.size]];
  return (
    <Div className={className.join(" ")}></Div>
  )
}