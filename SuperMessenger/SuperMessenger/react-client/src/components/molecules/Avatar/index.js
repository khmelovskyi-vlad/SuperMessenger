import React from 'react'
import Img from '../../atoms/Img';
import Li from '../../atoms/Li';

import styles from './style.module.css'

export default function Avatar(props) {
  return (
    <Li className="nav-item">
      <Img src={`/avatars/${props.imageId}.jpg`} alt="avatar" size="small" />
    </Li>
  );
}