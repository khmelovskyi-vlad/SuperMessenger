import React from 'react';
import ImgPaths from '../../../ImgPaths';
import Div from '../../atoms/Div';
import Img from '../../atoms/Img';

import styles from './style.module.css'

export default function SimpleImgContent(props) {
  const classList = [props.className, styles[props.size],
    "align-items-center", "justify-content-center", "d-flex", "m-0", "p-0", "col-3", props.classes]
  const imageName = props.imageName ? props.imageName : "00000000-0000-0000-0000-000000000000.jpg";
  const type = props.isUser ? "Avatars" : "GroupImages";
  const path = `/api/Images?type=${type}&imageName=${imageName}`;
  // const imgPaths = new ImgPaths();
  // const imageName = props.imageName ? props.imageName : "00000000-0000-0000-0000-000000000000.jpg";
  // const path = props.isUser
  //   ? imgPaths.join(imgPaths.userAvatarsPath, imageName)
  //   : imgPaths.join(imgPaths.groupImgsPath, imageName);
  return (
    <Div className={classList.join(" ")}>
      <Img src={path} alt="image" className={props.imgClasses}/>
    </Div>
  );
       // foo: path.resolve('C:/GIT/SuperMessenger/SuperMessenger/SuperMessenger/react-client/imgs'),
}