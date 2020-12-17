import React from 'react';
import ImageType from '../../../containers/Enums/ImageType';
import ImagesApiPathMaster from '../../../containers/Pathes/ImagesApiPathMaster';
import Div from '../../atoms/Div';
import Img from '../../atoms/Img';

import styles from './style.module.css'

export default function SimpleImgContent(props) {
  const className = [props.className, styles[props.size],
    "align-items-center", "justify-content-center", "d-flex", "m-0", "p-0", "col-3", props.classes]
  const imageApiPathMaster = new ImagesApiPathMaster();
  const type = props.isUser ? ImageType.avatars : ImageType.groupImages;
  const path = imageApiPathMaster.getImagePath(type,  props.imageName);
  return (
    <Div className={className.join(" ")}>
      <Img src={path} alt="image" className={props.imgClasses}/>
    </Div>
  );
}