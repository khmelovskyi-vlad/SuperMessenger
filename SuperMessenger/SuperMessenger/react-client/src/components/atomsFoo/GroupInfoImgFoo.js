import React from 'react';
import Img from '../atoms/Img';
export default function GroupInfoImgFoo(props) {
  const classList = ["column", props.classes]
  return (
    <Img src={`/groupImgs/${props.imageId}.jpg`} alt="image" className={classList.join(" ")} /*"simpleGroupImg"*//>
  );
}