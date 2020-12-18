import React from 'react';
import Div from '../../atoms/Div';
import ChatMessage from '../../molecules/ChatMessage';

import styles from './style.module.css'
import MessageScrollButton from '../../molecules/MessageScrollButton';

export default function ChatMessages(props) {
  const className = [props.className, styles[props.size], "column", "p-0", "m-0", "position-relative"];
  function createMessagesSentFiles() {
    if (props.messages && props.sentFiles && props.messages.length > 0 && props.sentFiles.length > 0) {
      return props.messages.concat(props.sentFiles);
    } else if (props.messages) {
      return props.messages;
    } else {
      return props.sentFiles;
    }
  }
  return (
    <>
      <Div id="ChatMessages" onScroll={props.onScrollMessage} className={className.join(" ")}
        style={{ overflowY: "auto", overflowX: "hidden" }}>
        {
          (props.messages || props.sentFiles) &&
          createMessagesSentFiles().sort((a, b) => a.sendDate - b.sendDate).map(data =>
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