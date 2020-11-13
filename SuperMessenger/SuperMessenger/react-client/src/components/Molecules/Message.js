import React from 'react'
import MessageSub from '../Atoms/MessageSub'
export default function Message(props) {
  const classList = ["column", "p-1", props.isMyMessage ? "myMessage" : "noMyMessage"]
  return (
    <span className={classList.join(" ")}>
      {props.value}
      <MessageSub date={props.date}/>
    </span>
  )
}