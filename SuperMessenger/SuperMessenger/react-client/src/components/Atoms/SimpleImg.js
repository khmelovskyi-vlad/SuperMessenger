import React from 'react';
export default function SimpleImg(props) {
  const classList = [props.classes]
  return (
    <img src={`/groupImgs/${props.imageId}.jpg`} className={classList.join(" ")} /*"simpleGroupImg"*//>
  );
}