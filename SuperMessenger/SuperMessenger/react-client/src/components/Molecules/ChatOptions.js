import React from 'react';
import ChatName from '../Atoms/ChatName';
export default function ChatOptions(props) {
  return (
    <div className="col-1 row justify-content-around">
      <ChatName group={props.group} myId={props.myId}/>
      <div className="column">
        <input type="bottun" value="showChatInfo"/>
      </div>
    </div>
  );
}