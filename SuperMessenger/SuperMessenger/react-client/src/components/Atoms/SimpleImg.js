import React from 'react';
import ImgPaths from '../../ImgPaths';
export default function SimpleImg(props) {
  const classList = [props.classes]
  const imgPaths = new ImgPaths();
  const path = props.isUser
    ? imgPaths.join(imgPaths.userAvatarsPath, props.imageId)
    : imgPaths.join(imgPaths.groupImgsPath, props.imageId);
  return (
    // <img src={`/groupImgs/${props.imageId}.jpg`} className={classList.join(" ")} /*"simpleGroupImg"*//>
    <img src={`${path}.jpg`} className={classList.join(" ")}/>
  );
}