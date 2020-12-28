import React from 'react';
import ChatMessages from '../../components/organisms/ChatMessages';


export default function ChatMessageListContainer({
  className,
  size,
  messages,
  sentFiles,
  onScrollMessage,
  myId,
  renderMessageScrollButton,
  onClickMessageScrollButton,
}) {
  function createMessageList() {
    if (messages && sentFiles && messages.length > 0 && sentFiles.length > 0) {
      return messages.concat(sentFiles);
    } else if (messages) {
      return messages;
    } else {
      return sentFiles;
    }
  }
  return (
    <ChatMessages
      messageList={createMessageList()}
      onScrollMessage={onScrollMessage}
      className={className}
      size={size}
      messages={messages}
      sentFiles={sentFiles}
      myId={myId}
      renderMessageScrollButton={renderMessageScrollButton}
      onClickMessageScrollButton={onClickMessageScrollButton}
    />
  );
}