import React from 'react';
import ImgPaths from '../../../ImgPaths';
import Img from '../../atoms/Img';
import Sub from '../../atoms/Sub'

import styles from './style.module.css'

export default function MessageSub(props) {
  const className = [props.className, styles[props.size]];
  const imgPaths = new ImgPaths();
  return (
    <Sub className={className.join(" ")}>
      {props.date}
      <Img
        src={`${imgPaths.join(imgPaths.imgs,
          props.isMyMessage ? props.isConfirmed ? "myCheckMark" : "unconfirmedMessage" : "noMyCheckMark"
        )}.png`}
        style={{maxWidth:"2vmin"}}
      />
    </Sub>
  )
}