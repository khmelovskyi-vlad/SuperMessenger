import React from 'react';
import ChatMessages from '../../components/organisms/ChatMessages';


export default function ChatMessageListContainer(props) {
  function createMessageList() {
    if (props.messages && props.sentFiles && props.messages.length > 0 && props.sentFiles.length > 0) {
      return props.messages.concat(props.sentFiles);
    } else if (props.messages) {
      return props.messages;
    } else {
      return props.sentFiles;
    }
  }
  return (
    <ChatMessages
      messageList={createMessageList()}
      className={props.className}
      size={props.size}
      messages={props.messages}
      sentFiles={props.sentFiles}
      myId={props.myId}
      renderMessageScrollButton={props.renderMessageScrollButton}
      onClickMessageScrollButton={props.onClickMessageScrollButton}
    />
  );
}