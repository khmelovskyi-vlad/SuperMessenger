import React from 'react';
import Span from '../../atoms/Span'
import MessageSub from '../MessageSub';

import styles from './style.module.css'

export default function Message({
  className,
  size,
  isMyMessage,
  value,
  date,
  isConfirmed,
}) {
  const classNames = [className, styles[size], "column", "p-1", isMyMessage ? "myMessage" : "noMyMessage"];
  
  return (
    <Span className={classNames.join(" ")}>
      {value}
      <MessageSub date={date} isMyMessage={isMyMessage} isConfirmed={isConfirmed}/>
    </Span>
  )
}