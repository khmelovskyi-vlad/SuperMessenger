import React from 'react';
import ChatName from '../molecules/ChatName';
import Div from '../atoms/Div';
import Input from '../atoms/Input';
export default function ChatOptions(props) {
  return (
    <Div className="column p-0 m-0 px-2 row justify-content-between chatOptions sticky-bottom">
      <ChatName group={props.group} myId={props.myId}/>
      <Div className="column">
        <Input
          type="button"
          defaultValue={props.showGroupInfo ? "close chat info" :"show chat info"}
          onClick={props.onClickShowGroupInfo}
        />
      </Div>
    </Div>
  );
}