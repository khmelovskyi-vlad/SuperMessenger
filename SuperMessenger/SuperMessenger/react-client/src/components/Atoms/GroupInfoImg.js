import React from 'react';
export default function GroupInfoImg(props) {
  return (
    <img src={`/groupImgs/${props.imageId}.jpg`} className="groupInfoImg column"/>
  );
}