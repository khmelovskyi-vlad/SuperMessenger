import React from 'react';
import Span from '../../atoms/Span'
import MessageSub from '../MessageSub';

import styles from './style.module.css'

export default function Message(props) {
  const className = [props.className, styles[props.size], "column", "p-1", props.isMyMessage ? "myMessage" : "noMyMessage"];
  
  return (
    <Span className={className.join(" ")}>
      {props.value}
      <MessageSub date={props.date} isMyMessage={props.isMyMessage} isConfirmed={props.isConfirmed}/>
    </Span>
  )
}