import React from 'react';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import ChatName from '../../molecules/ChatName';

import styles from './style.module.css'

export default function ChatOptions(props) {
  const className = [props.className, styles[props.size],
    "column", "p-0", "m-0", "px-2", "row", "justify-content-between", "chatOptions"];
  return (
    <Div className={className.join(" ")}>
      <ChatName group={props.group} myId={props.myId}/>
      <Div className="column">
        <Input
          type="button"
          defaultValue={props.showGroupInfo ? "close chat info" : "show chat info"}
          onClick={props.onClickShowGroupInfo}
        />
      </Div>
    </Div>
  );
}