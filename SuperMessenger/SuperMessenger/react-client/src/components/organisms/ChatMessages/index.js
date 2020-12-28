import React from 'react';
import Div from '../../atoms/Div';
import ChatMessage from '../../molecules/ChatMessage';
import MessageScrollButton from '../../molecules/MessageScrollButton';

import styles from './style.module.css'

export default function ChatMessages({
  className,
  size,
  onScrollMessage,
  messageList,
  myId,
  renderMessageScrollButton,
  onClickMessageScrollButton,
}) {
  const classNames = [className, styles[size], "column", "p-0", "m-0", "position-relative"];
  
  return (
    <>
      <Div id="ChatMessages" onScroll={onScrollMessage} className={classNames.join(" ")}
        style={{ overflowY: "auto", overflowX: "hidden" }}>
        {
          messageList &&
          messageList.sort((a, b) => a.sendDate - b.sendDate).map(data =>
            <ChatMessage
              key={data.id}
              data={data}
              myId={myId}
              isConfirmed={data.isConfirmed}
            />)
        }
      </Div>
      {
        renderMessageScrollButton && 
        <MessageScrollButton
          onClick={onClickMessageScrollButton}
        />
      }
    </>
  );
}