import React from 'react';
import Groups from '../Molecules/Groups';
import ChatMessages from './ChatMessages';
import ChatOptions from './ChatOptions';
import SendMessageForm from './SendMessageForm';
export default function Chat(props) {
  const classList = ["row", "p-0", "m-0", "flex-column", "flex-nowrap", props.showGroupInfo ? "col-5" : "col-8"];
  return (
    <div
      id="Chat"
      className={classList.join(" ")}
      style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "90vh" }}
    >
      <ChatOptions
        myId={props.simpleMe.id}
        group={props.groupData}
        onClickShowGroupInfo={props.onClickShowGroupInfo}
        showGroupInfo={props.showGroupInfo}
      />
      <ChatMessages myId={props.simpleMe.id} messages={props.groupData.messages} />
      <SendMessageForm onSubmitSendMessage={props.onSubmitSendMessage} groupId={props.groupData.id} simpleMe={props.simpleMe}/>
    </div>
  );
}