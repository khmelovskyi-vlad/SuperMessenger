import React from 'react';
import ImgPaths from '../../ImgPaths';
import Div from '../atoms/Div';
import Img from '../atoms/Img';
export default function SimpleImgContentFoo(props) {
  const classList = ["align-items-center", "justify-content-center", "d-flex", "m-0", "p-0", "col-3", props.classes]
  const imgPaths = new ImgPaths();
  const path = props.isUser
    ? imgPaths.join(imgPaths.userAvatarsPath, props.imageId)
    : imgPaths.join(imgPaths.groupImgsPath, props.imageId);
  return (
    <Div className={classList.join(" ")}>
      <Img src={`${path}.jpg`} alt="image" className={props.imgClasses}/>
    </Div>
  );
}