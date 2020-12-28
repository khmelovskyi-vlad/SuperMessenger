import React from 'react';
import styles from './style.module.css'


export default function Sup({
  className,
  size,
  children,
}) { 
  const classNames = [className, styles["sup"], styles[size]]
  return (
    <sup className={classNames.join(" ")}>
      {children}
   </sup> 
  )
}