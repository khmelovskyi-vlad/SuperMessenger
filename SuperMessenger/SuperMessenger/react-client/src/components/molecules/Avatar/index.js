import React from 'react'
import ImageType from '../../../containers/Enums/ImageType';
import ImagesApiPathMaster from '../../../containers/Pathes/ImagesApiPathMaster';
import Img from '../../atoms/Img';
import Li from '../../atoms/Li';

import styles from './style.module.css'
// import { useState } from 'react';

export default function Avatar(props) {
  const className = [props.className, styles[props.size], "nav-item"];
  const imageApiPathMaster = new ImagesApiPathMaster();
  const path = imageApiPathMaster.getImagePath(ImageType.avatars, props.imageName);
  return (
    <Li className={className.join(" ")}>
      <Img src={path}
        alt="avatar" size="small" />
    </Li>
  );
}