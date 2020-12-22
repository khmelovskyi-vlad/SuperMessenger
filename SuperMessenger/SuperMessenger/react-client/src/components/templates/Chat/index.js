import React from 'react';
import Div from '../../atoms/Div';
import SendFileForm from '../../molecules/SendFileForm';
import SendMessageForm from '../../molecules/SendMessageForm';
import ChatOptions from '../../organisms/ChatOptions';
import ChatMessageListContainer from '../../../containers/ChatMessageListContainer';


import styles from './style.module.css'

export default function Chat(props) {
  const className = [props.className, styles[props.size],
    "row", "p-0", "m-0", "flex-column", "flex-nowrap", props.showGroupInfo ? "col-5" : "col-8"];
  return (
    <Div
      id="Chat"
      className={className.join(" ")}
      style={{ maxHeight: "90vh" }}
    >
      <ChatOptions
        myId={props.simpleMe.id}
        group={props.groupData}
        onClickShowGroupInfo={props.onClickShowGroupInfo}
        showGroupInfo={props.showGroupInfo}
      />
      <ChatMessageListContainer
        myId={props.simpleMe.id}
        messages={props.groupData.messages}
        sentFiles={props.groupData.messageFiles}
        onScrollMessage={props.onScrollMessage}
        renderMessageScrollButton={props.renderMessageScrollButton}
        onClickMessageScrollButton={props.onClickMessageScrollButton}
      />
      
      <Div className="row m-0 p-0 w-100 flex-nowrap" >
        <SendMessageForm
          onSubmitSendMessage={props.onSubmitSendMessage}
          onChange={props.onChangeMessage}
          createMessage={props.onCreateMessage}
        />
        <SendFileForm
          onSubmitSendFiles={props.onSubmitSendFiles}
          onChange={props.onChangeFile}
        />
      </Div>
    </Div>
  );
}