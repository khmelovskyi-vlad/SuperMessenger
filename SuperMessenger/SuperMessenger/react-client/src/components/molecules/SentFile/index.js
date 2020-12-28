import React from 'react';
import SentFilesApiPathMaster from '../../../Entities/Pathes/SentFilesApiPathMaster';
import Button from '../../atoms/Button';
import MessageSub from '../MessageSub';

import styles from './style.module.css'

export default function SentFile({
  className,
  size,
  isMyMessage,
  isConfirmed,
  groupId,
  id,
  name,
  date,
}) {
  const classNames = [className, styles[size], "column", "p-1", isMyMessage ? "myMessage" : "noMyMessage"];
  const sentFilesApiPathMaster = new SentFilesApiPathMaster();
  function handleOnClickDownloadFile() {
    window.location.replace(sentFilesApiPathMaster.getSentFilePath(groupId, id));
  }
  const disabled = isConfirmed ? false : true;
  return (
    <Button className={classNames.join(" ")} disabled={disabled} onClick={() => handleOnClickDownloadFile()}>
      {name}
      <MessageSub date={date} isMyMessage={isMyMessage} isConfirmed={isConfirmed}/>
    </Button>
  )
}