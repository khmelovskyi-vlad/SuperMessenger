import React from 'react';
import ChatName from '../Atoms/ChatName';
export default function ChatOptions(props) {
  return (
    <div className="column p-0 m-0 px-2 row justify-content-between chatOptions sticky-bottom">
      <ChatName group={props.group} myId={props.myId}/>
      <div className="column">
        <input
          type="button"
          defaultValue={props.showGroupInfo ? "close chat info" :"show chat info"}
          onClick={props.onClickShowGroupInfo}
        />
      </div>
    </div>
  );
}