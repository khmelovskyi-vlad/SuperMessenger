import React from 'react';
import Span from '../../atoms/Span'
import Sub from '../../atoms/Sub'

import styles from './style.module.css'

export default function Message(props) {
  const classList = ["column", "p-1", props.isMyMessage ? "myMessage" : "noMyMessage"]
  return (
    <Span className={classList.join(" ")}>
      {props.value}
      <Sub children={props.date}/>
    </Span>
  )
}