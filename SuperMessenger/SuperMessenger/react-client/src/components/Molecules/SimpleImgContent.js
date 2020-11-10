import React from 'react';
import SimpleImg from '../Atoms/SimpleImg';
export default function SimpleImgContent(props) {
  return (
    <div className="m-0 p-0 col-4 simpleImgContent">
      <SimpleImg imageId={props.imageId} classes={props.imgClasses}/>
    </div>
  );
}