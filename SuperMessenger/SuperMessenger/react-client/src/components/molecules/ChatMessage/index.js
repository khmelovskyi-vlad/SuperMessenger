import React from 'react';
import CreatorDate from '../../../containers/CreatorDate';
import Div from '../../atoms/Div';
import Message from '../Message';
import SentFile from '../SentFile';

import styles from './style.module.css'

export default function ChatMessage(props) {
  const className = ["column", "d-flex", "p-2", "m-0", styles[props.size],
    props.data.user.id === props.myId ? "myMessageDiv" : "noMyMessageDiv"];
  return (
    <Div className={className.join(" ")}>
      {
        props.data.value ?
          <Message
            value={props.data.value}
            date={CreatorDate.createStringDate(props.data.sendDate)}
            isMyMessage={props.data.user.id === props.myId}
            isConfirmed={props.isConfirmed}
          />
          :
          <SentFile
            name={props.data.name}
            date={CreatorDate.createStringDate(props.data.sendDate)}
            groupId={props.data.groupId}
            id={props.data.id}
            isMyMessage={props.data.user.id === props.myId}
            isConfirmed={props.isConfirmed}
          />
      }
    </Div>
  );
}