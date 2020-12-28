import React from 'react';
import ImgPaths from '../../../Entities/Pathes/ImgPaths';
import Img from '../../atoms/Img';
import Sub from '../../atoms/Sub'

import styles from './style.module.css'

export default function MessageSub({
  className,
  size,
  date,
  isMyMessage,
  isConfirmed,
}) {
  const classNames = [className, styles[size]];
  const imgPaths = new ImgPaths();
  return (
    <Sub className={classNames.join(" ")}>
      {date}
      <Img
        src={imgPaths.getMessageSubPath(isMyMessage, isConfirmed)}
        style={{maxWidth:"2vmin"}}
      />
    </Sub>
  )
}