import React from 'react';
import ImgPaths from '../../ImgPaths';
import Img from './Img';
export default function SimpleImgFoo(props) {
  const classList = [props.classes]
  const imgPaths = new ImgPaths();
  const path = props.isUser
    ? imgPaths.join(imgPaths.userAvatarsPath, props.imageId)
    : imgPaths.join(imgPaths.groupImgsPath, props.imageId);
  return (
    // <img src={`/groupImgs/${props.imageId}.jpg`} className={classList.join(" ")} /*"simpleGroupImg"*//>
    <Img src={`${path}.jpg`} alt="image" className={classList.join(" ")}/>
  );
}