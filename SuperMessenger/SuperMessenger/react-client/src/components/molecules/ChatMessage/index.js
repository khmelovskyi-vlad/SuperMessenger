import React from 'react';
import CreatorDate from '../../../CreatorDate';
import Div from '../../atoms/Div';
import Message from '../Message';
import SentFile from '../SentFile';

import styles from './style.module.css'

export default function ChatMessage(props) {
  const classList = [ "column", "d-flex", "p-2", "m-0", props.data.user.id === props.myId ? "myMessageDiv" : "noMyMessageDiv"];
  return (
    <Div className={classList.join(" ")}>
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