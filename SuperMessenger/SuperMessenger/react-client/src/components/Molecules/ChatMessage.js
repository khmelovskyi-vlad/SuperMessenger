import React from 'react';
export default function ChatMessage(props) {
  const classList = [ "column", props.message.simpleUser.id === props.myId ? "myMessage" : "noMyMessage"];
  return (
    <div className={classList.join(" ")}>
      <p>{props.message.value}</p>
      <p>{props.message.sendDate}</p>
    </div>
  );
}