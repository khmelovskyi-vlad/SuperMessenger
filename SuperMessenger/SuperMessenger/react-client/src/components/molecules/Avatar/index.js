import React from 'react'
import Img from '../../atoms/Img';
import Li from '../../atoms/Li';

import styles from './style.module.css'

export default function Avatar(props) {
  // console.log(props.imageName);
  const imageName = props.imageName ? props.imageName : "00000000-0000-0000-0000-000000000000.jpg";
  const path = `/api/Images?type=Avatars&imageName=${imageName}`;
  return (
    <Li className="nav-item">
      {/* <Img src={`/avatars/${props.imageName ? props.imageName : "00000000-0000-0000-0000-000000000000.jpg"}`}
        alt="avatar" size="small" /> */}
      {/* <img src={require('foo/00000000-0000-0000-0000-000000000000.jpg')}/> */}
      <Img src={path}
        alt="avatar" size="small" />
    </Li>
  );
}