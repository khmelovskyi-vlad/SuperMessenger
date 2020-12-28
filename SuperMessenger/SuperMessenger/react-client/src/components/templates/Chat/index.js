import React from 'react';
import Div from '../../atoms/Div';
import SendFileForm from '../../molecules/SendFileForm';
import SendMessageForm from '../../molecules/SendMessageForm';
import ChatOptions from '../../organisms/ChatOptions';
import ChatMessageListContainer from '../../../containers/ChatMessageListContainer';


import styles from './style.module.css'

export default function Chat({
  className,
  size,
  showGroupInfo,
  simpleMe,
  groupData,
  onClickShowGroupInfo,
  onScrollMessage,
  renderMessageScrollButton,
  onClickMessageScrollButton,
  onSubmitSendMessage,
  onChangeMessage,
  onCreateMessage,
  onChangeFile,
}) {
  const classNames = [className, styles[size],
    "row", "p-0", "m-0", "flex-column", "flex-nowrap", showGroupInfo ? "col-5" : "col-8"];
  return (
    <Div
      id="Chat"
      className={classNames.join(" ")}
      style={{ maxHeight: "90vh" }}
    >
      <ChatOptions
        myId={simpleMe.id}
        group={groupData}
        onClickShowGroupInfo={onClickShowGroupInfo}
        showGroupInfo={showGroupInfo}
      />
      <ChatMessageListContainer
        myId={simpleMe.id}
        messages={groupData.messages}
        sentFiles={groupData.messageFiles}
        onScrollMessage={onScrollMessage}
        renderMessageScrollButton={renderMessageScrollButton}
        onClickMessageScrollButton={onClickMessageScrollButton}
      />
      
      <Div className="row m-0 p-0 w-100 flex-nowrap" >
        <SendMessageForm
          onSubmitSendMessage={onSubmitSendMessage}
          onChange={onChangeMessage}
          createMessage={onCreateMessage}
        />
        <SendFileForm
          onChange={onChangeFile}
        />
      </Div>
    </Div>
  );
}