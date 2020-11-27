import React from 'react';
import ImgPaths from '../../../ImgPaths';
import Button from '../../atoms/Button';
import Img from '../../atoms/Img';
import Sub from '../../atoms/Sub';
import MessageSub from '../MessageSub';

import styles from './style.module.css'

export default function SentFile(props) {
  const classList = ["column", "p-1", props.isMyMessage ? "myMessage" : "noMyMessage"]
  function handleOnClickDownloadFile() {
    window.location.replace(`/api/SentFiles?groupId=${props.groupId}&fileId=${props.id}`);
  }
  const disabled = props.isConfirmed ? false : true;
  const imgPaths = new ImgPaths();
  return (
    <Button className={classList.join(" ")} disabled={disabled} onClick={() => handleOnClickDownloadFile()}>
      {props.name}
      <MessageSub date={props.date} isMyMessage={props.isMyMessage} isConfirmed={props.isConfirmed}/>
      {/* <Sub children={props.date}/>
      <Img
        src={`${imgPaths.join(imgPaths.imgs, props.isMyMessage ? "myCheckMark" : "noMyCheckMark")}.png`}
        style={{maxWidth:"2vmin"}}
      /> */}
    </Button>
  )
}