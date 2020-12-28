import React from 'react';
import ImageType from '../../../Entities/Enums/ImageType';
import ImagesApiPathMaster from '../../../Entities/Pathes/ImagesApiPathMaster';
import Div from '../../atoms/Div';
import Img from '../../atoms/Img';

import styles from './style.module.css'

export default function SimpleImgContent({
  size,
  className,
  isUser,
  imageName,
  imgClasses,
}) {
  const classNames = [className, styles[size],
    "align-items-center", "justify-content-center", "d-flex", "m-0", "p-0", "col-3"]
  const imageApiPathMaster = new ImagesApiPathMaster();
  const type = isUser ? ImageType.avatars : ImageType.groupImages;
  const path = imageApiPathMaster.getImagePath(type,  imageName);
  return (
    <Div className={classNames.join(" ")}>
      <Img src={path} alt="image" className={imgClasses}/>
    </Div>
  );
}