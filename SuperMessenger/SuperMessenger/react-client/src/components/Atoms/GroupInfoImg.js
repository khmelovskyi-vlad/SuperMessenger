import React from 'react';
export default function GroupInfoImg(props) {
  const classList = ["column", props.classes]
  return (
    <img src={`/groupImgs/${props.imageId}.jpg`} className={classList.join(" ")} /*"simpleGroupImg"*//>
  );
}