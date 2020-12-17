import React from 'react';
import ImgPaths from '../../../containers/Pathes/ImgPaths';
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
        src={imgPaths.getMessageSubPath(props.isMyMessage, props.isConfirmed)}
        style={{maxWidth:"2vmin"}}
      />
    </Sub>
  )
}