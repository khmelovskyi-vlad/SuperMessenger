import React from 'react';
import Groups from '../Molecules/Groups';
import ChatMessages from './ChatMessages';
import ChatOptions from './ChatOptions';
import SendMessageForm from './SendMessageForm';
export default function Chat(props) {
  const classList = ["row", "justify-content-around", props.isOpenChatInfo ? "col-5" : "col-8" ];
  return (
    <div className={classList.join(" ")}>
      <ChatOptions myId={props.simpleMe.Id} group={props.groupData} />
      <ChatMessages myId={props.simpleMe.Id} messages={props.group.messages} />
      <SendMessageForm onSubmitSendMessage={props.onSubmitSendMessage} groupId={props.groupData.Id} simpleMe={props.simpleMe}/>
    </div>
  );
}