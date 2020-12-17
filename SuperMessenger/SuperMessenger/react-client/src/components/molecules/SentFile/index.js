import React from 'react';
import SentFilesApiPathMaster from '../../../containers/Pathes/SentFilesApiPathMaster';
import Button from '../../atoms/Button';
import MessageSub from '../MessageSub';

import styles from './style.module.css'

export default function SentFile(props) {
  const classList = [props.className, styles[props.size], "column", "p-1", props.isMyMessage ? "myMessage" : "noMyMessage"];
  const sentFilesApiPathMaster = new SentFilesApiPathMaster();
  function handleOnClickDownloadFile() {
    window.location.replace(sentFilesApiPathMaster.getSentFilePath(props.groupId, props.id));
  }
  const disabled = props.isConfirmed ? false : true;
  return (
    <Button className={classList.join(" ")} disabled={disabled} onClick={() => handleOnClickDownloadFile()}>
      {props.name}
      <MessageSub date={props.date} isMyMessage={props.isMyMessage} isConfirmed={props.isConfirmed}/>
    </Button>
  )
}