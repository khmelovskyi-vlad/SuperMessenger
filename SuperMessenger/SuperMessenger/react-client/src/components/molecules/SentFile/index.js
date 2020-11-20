import React from 'react';
import Button from '../../atoms/Button';
import Sub from '../../atoms/Sub';

import styles from './style.module.css'

export default function SentFile(props) {
  const classList = ["column", "p-1", props.isMyMessage ? "myMessage" : "noMyMessage"]
  function handleOnClickDownloadFile() {
    window.location.replace(`/api/SentFiles?groupId=${props.groupId}&fileId=${props.id}`);
  }
  return (
    <Button className={classList.join(" ")} onClick={() => handleOnClickDownloadFile()}>
      {props.name}
      <Sub children={props.date}/>
    </Button>
  )
}