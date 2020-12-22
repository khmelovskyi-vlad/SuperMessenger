import React from 'react';
import Div from '../../atoms/Div';
import ChatMessage from '../../molecules/ChatMessage';
import MessageScrollButton from '../../molecules/MessageScrollButton';

import styles from './style.module.css'

export default function ChatMessages(props) {
  const className = [props.className, styles[props.size], "column", "p-0", "m-0", "position-relative"];
  
  return (
    <>
      <Div id="ChatMessages" onScroll={props.onScrollMessage} className={className.join(" ")}
        style={{ overflowY: "auto", overflowX: "hidden" }}>
        {
          props.messageList &&
          props.messageList.sort((a, b) => a.sendDate - b.sendDate).map(data =>
            <ChatMessage
              key={data.id}
              data={data}
              myId={props.myId}
              isConfirmed={data.isConfirmed}
            />)
        }
      </Div>
      {
        props.renderMessageScrollButton && 
        <MessageScrollButton
          onClick={props.onClickMessageScrollButton}
        />
      }
    </>
  );
}