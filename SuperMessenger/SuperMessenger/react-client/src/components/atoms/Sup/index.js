import React from 'react';
import styles from './style.module.css'


export default function Sup(props) { 
  const className = [props.className, styles["sup"], styles[props.size]]
  return (
    <sup className={className.join(" ")}>
      {props.children}
   </sup> 
  )
}