import React from 'react';
import SimpleImg from '../Atoms/SimpleImg';
export default function SimpleImgContent(props) {
  const classList = ["align-items-center", "justify-content-center", "d-flex", "m-0", "p-0", "col-3", props.classes]
  return (
    <div className={classList.join(" ")}>
      <SimpleImg
        imageId={props.imageId}
        classes={props.imgClasses}
        isUser={props.isUser}/>
    </div>
  );
}