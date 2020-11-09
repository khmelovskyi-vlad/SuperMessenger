import React from 'react';
export default function SimpleGroupImg(props) {
  return (
    <img src={`/groupImgs/${props.imageId}.jpg`} className="simpleGroupImg"/>
  );
}