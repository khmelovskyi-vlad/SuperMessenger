import React from 'react';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import ChatName from '../../molecules/ChatName';

import styles from './style.module.css'

export default function ChatOptions({
  className,
  size,
  group,
  myId,
  showGroupInfo,
  onClickShowGroupInfo,
}) {
  const classNames = [className, styles[size],
    "column", "p-0", "m-0", "px-2", "row", "justify-content-between", "chatOptions"];
  return (
    <Div className={classNames.join(" ")}>
      <ChatName group={group} myId={myId}/>
      <Div className="column">
        <Input
          type="button"
          defaultValue={showGroupInfo ? "close chat info" : "show chat info"}
          onClick={onClickShowGroupInfo}
        />
      </Div>
    </Div>
  );
}