import React from 'react'
import Img from '../../atoms/Img';
import Li from '../../atoms/Li';

import styles from './style.module.css'

export default function Avatar(props) {
  const className = [props.className, styles[props.size], "nav-item"];
  const imageName = props.imageName ? props.imageName : "00000000-0000-0000-0000-000000000000.jpg";
  const path = `/api/Images?type=Avatars&imageName=${imageName}`;
  return (
    <Li className={className.join(" ")}>
      <Img src={path}
        alt="avatar" size="small" />
    </Li>
  );
}