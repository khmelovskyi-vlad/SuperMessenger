import React from 'react';
export default function ChatMessage(props) {
  const classList = [ "column", " p-0", "m-0", props.message.user.id === props.myId ? "myMessage" : "noMyMessage"];
  return (
    <div className={classList.join(" ")}>
      <p>{props.message.value}</p>
      {`${props.message.sendDate.getHours()}:${props.message.sendDate.getMinutes()}`}
      {/* <p>{props.message.sendDate}</p> */}
    </div>
  );
}