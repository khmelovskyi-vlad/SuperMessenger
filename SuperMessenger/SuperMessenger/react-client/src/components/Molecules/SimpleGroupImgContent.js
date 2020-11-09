import React from 'react';
import SimpleGroupImg from '../Atoms/SimpleGroupImg';
export default function SimpleGroupImgContent(props) {
  return (
    <div className="m-0 p-0 col-4 simpleGroupImgContent">
      <SimpleGroupImg imageId={props.imageId}/>
    </div>
  );
}