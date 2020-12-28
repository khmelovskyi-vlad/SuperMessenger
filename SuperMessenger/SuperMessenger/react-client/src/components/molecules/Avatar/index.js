import React from 'react'
import ImageType from '../../../Entities/Enums/ImageType';
import ImagesApiPathMaster from '../../../Entities/Pathes/ImagesApiPathMaster';
import Img from '../../atoms/Img';
import Li from '../../atoms/Li';

import styles from './style.module.css'
// import { useState } from 'react';

export default function Avatar({
  className,
  size,
  imageName,
}) {
  const classNames = [className, styles[size], "nav-item"];
  const imageApiPathMaster = new ImagesApiPathMaster();
  const path = imageApiPathMaster.getImagePath(ImageType.avatars, imageName);
  return (
    <Li className={classNames.join(" ")}>
      <Img src={path}
        alt="avatar" size="small" />
    </Li>
  );
}