import React from 'react';
import Button from '../../atoms/Button';
import Span from '../../atoms/Span';
import Sup from '../../atoms/Sup';

import styles from './style.module.css'

export default function StandardButton({
  className,
  size,
  onClick,
  title,
  value,
  showSup,
}) { 
  const classNames = [className, styles[size], "nav-link", "btn"];
  return (
    <Button
      className={classNames.join(" ")}
      onClick={onClick}>
      <Span>
        {title}{showSup&&<Sup children={value}/>}
      </Span>
    </Button>
  )
}