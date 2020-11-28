import React from 'react';
import ImgPaths from '../../../ImgPaths';
import Img from '../../atoms/Img';
import Sub from '../../atoms/Sub'

import styles from './style.module.css'

export default function MessageSub(props) {
  const imgPaths = new ImgPaths();
  return (
    <Sub>
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