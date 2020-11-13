import React from 'react';
import MessageSub from '../Atoms/MessageSub';
import Message from './Message';
export default function ChatMessage(props) {
  const classList = [ "column", "d-flex", "p-2", "m-0", props.message.user.id === props.myId ? "myMessageDiv" : "noMyMessageDiv"];
  return (
    <div className={classList.join(" ")}>
      {/* <span>
        {props.message.value}
        <MessageSub date={`${props.message.sendDate.getHours()}:${props.message.sendDate.getMinutes()}`} />
      </span> */}
      <Message
        value={props.message.value}
        date={`${props.message.sendDate.getHours()}:${props.message.sendDate.getMinutes()}`}
        isMyMessage={props.message.user.id == props.myId}
      />
      {/* {`${props.message.sendDate.getHours()}:${props.message.sendDate.getMinutes()}`} */}
      {/* <p>{props.message.sendDate}</p> */}
    </div>
  );
}