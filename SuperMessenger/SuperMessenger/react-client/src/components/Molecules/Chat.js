import React from 'react';
import Groups from '../Molecules/Groups';
import ChatMessages from './ChatMessages';
import ChatOptions from './ChatOptions';
import SendMessageForm from './SendMessageForm';
export default function Chat(props) {
  const classList = ["row", "p-0", "m-0", "flex-column", props.showGroupInfo ? "col-5" : "col-8" ];
  return (
    <div className={classList.join(" ")}>
      <ChatOptions myId={props.simpleMe.Id} group={props.groupData} onClickShowGroupInfo={props.onClickShowGroupInfo}/>
      <ChatMessages myId={props.simpleMe.Id} messages={props.groupData.messages} />
      <SendMessageForm onSubmitSendMessage={props.onSubmitSendMessage} groupId={props.groupData.id} simpleMe={props.simpleMe}/>
    </div>
  );
}