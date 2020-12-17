import React from 'react';
import Button from '../../atoms/Button';
import Span from '../../atoms/Span';
import Sup from '../../atoms/Sup';

import styles from './style.module.css'

export default function StandardButton(props) { 
  const className = [props.className, styles[props.size], "nav-link", "btn"];
  return (
    <Button
      className={className.join(" ")}
      onClick={props.type==="acceptApplication" ? () => props.onClick(props.applications) : props.onClick}>
      <Span>
        {props.title}{props.showSup&&<Sup children={props.value}/>}
      </Span>
    </Button>
  )
}