import React from 'react';
import ImgPaths from '../../../ImgPaths';
import Div from '../../atoms/Div';
import Img from '../../atoms/Img';
import Span from '../../atoms/Span'
import Sub from '../../atoms/Sub'
import MessageSub from '../MessageSub';

import styles from './style.module.css'

export default function Message(props) {
  const classList = ["column", "p-1", props.isMyMessage ? "myMessage" : "noMyMessage"]
  // const imgPaths = new ImgPaths();
  return (
    <Span className={classList.join(" ")}>
      {props.value}
      <MessageSub date={props.date} isMyMessage={props.isMyMessage} isConfirmed={props.isConfirmed}/>
        {/* {props.date}
        <Img
          src={`${imgPaths.join(imgPaths.imgs, props.isMyMessage ? "myCheckMark" : "noMyCheckMark")}.png`}
          style={{maxWidth:"2vmin"}}
        /> */}
    </Span>
  )
}