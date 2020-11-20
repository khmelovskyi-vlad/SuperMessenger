import React from 'react'
import Span from '../atoms/Span'
import Sub from '../atoms/Sub'
export default function MessageFoo(props) {
  const classList = ["column", "p-1", props.isMyMessage ? "myMessage" : "noMyMessage"]
  return (
    <Span className={classList.join(" ")}>
      {props.value}
      <Sub children={props.date}/>
    </Span>
  )
}