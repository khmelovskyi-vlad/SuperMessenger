import React from 'react';
import SimpleImg from '../Atoms/SimpleImg';
export default function SimpleImgContent(props) {
  const classList = ["m-0", "p-0", "col-3", "row", "justify-content-center", props.classes]
  return (
    <div className={classList.join(" ")}>
      <SimpleImg
        imageId={props.imageId}
        classes={props.imgClasses}
        isUser={props.isUser}/>
    </div>
  );
}