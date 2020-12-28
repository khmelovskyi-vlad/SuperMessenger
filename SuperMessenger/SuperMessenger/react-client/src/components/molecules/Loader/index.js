import React from 'react'
import Div from '../../atoms/Div'

import styles from './style.module.css'

export default function Loader({
  className,
  size,
}) {
  const classNames = [className, styles["lds-hourglass"], styles[size]];
  return (
    <Div className={classNames.join(" ")}></Div>
  )
}