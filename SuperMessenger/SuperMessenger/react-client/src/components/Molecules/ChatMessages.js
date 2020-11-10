import React from 'react';
import ChatMessage from './ChatMessage';
export default function ChatMessages(props) {
  return (
    <div className="column p-0 m-0">
      {
        props.messages &&
        props.messages.map(message => <ChatMessage key={message.id} message={message} myId={props.myId}/>)
      }
    </div>
  );
}