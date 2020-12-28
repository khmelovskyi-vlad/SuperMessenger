import React from 'react';
import CreatorDate from '../../../Services/CreatorDate';
import Div from '../../atoms/Div';
import Message from '../Message';
import SentFile from '../SentFile';

import styles from './style.module.css'

export default function ChatMessage({
  size,
  myId,
  data,
  isConfirmed,
}) {
  const classNames = ["column", "d-flex", "p-2", "m-0", styles[size],
    data.user.id === myId ? "myMessageDiv" : "noMyMessageDiv"];
  return (
    <Div className={classNames.join(" ")}>
      {
        data.value ?
          <Message
            value={data.value}
            date={CreatorDate.createStringDate(data.sendDate)}
            isMyMessage={data.user.id === myId}
            isConfirmed={isConfirmed}
          />
          :
          <SentFile
            name={data.name}
            date={CreatorDate.createStringDate(data.sendDate)}
            groupId={data.groupId}
            id={data.id}
            isMyMessage={data.user.id === myId}
            isConfirmed={isConfirmed}
          />
      }
    </Div>
  );
}