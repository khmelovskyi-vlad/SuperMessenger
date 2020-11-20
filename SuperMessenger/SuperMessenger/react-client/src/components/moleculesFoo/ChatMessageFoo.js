import React from 'react';
import CreatorDate from '../../CreatorDate';
import Div from '../atoms/Div';
import Message from '../molecules/Message';
import SentFile from '../molecules/SentFile';
export default function ChatMessageFoo(props) {
  // const classList = [ "column", "d-flex", "p-2", "m-0", props.message.user.id === props.myId ? "myMessageDiv" : "noMyMessageDiv"];
  const classList = [ "column", "d-flex", "p-2", "m-0", props.data.user.id === props.myId ? "myMessageDiv" : "noMyMessageDiv"];
  return (
    <Div className={classList.join(" ")}>
      {/* <span>
        {props.message.value}
        <MessageSub date={`${props.message.sendDate.getHours()}:${props.message.sendDate.getMinutes()}`} />
      </span> */}
      {/* <Message
        value={props.message.value}
        date={`${props.message.sendDate.getHours()}:${props.message.sendDate.getMinutes()}`}
        isMyMessage={props.message.user.id == props.myId}
      /> */}
      {/* {`${props.message.sendDate.getHours()}:${props.message.sendDate.getMinutes()}`} */}
      {/* <p>{props.message.sendDate}</p> */}
      {
        props.data.value ?
          <Message
            value={props.data.value}
            date={CreatorDate.createStringDate(props.data.sendDate)}
            isMyMessage={props.data.user.id == props.myId}
          />
          :
          <SentFile
            name={props.data.name}
            date={CreatorDate.createStringDate(props.data.sendDate)}
            groupId={props.data.groupId}
            id={props.data.id}
            isMyMessage={props.data.user.id == props.myId}
          />
      }
    </Div>
  );
}