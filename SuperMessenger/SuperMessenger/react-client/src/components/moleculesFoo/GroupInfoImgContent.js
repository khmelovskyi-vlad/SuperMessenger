import React from 'react';
import ImgPaths from '../../ImgPaths';
import Div from '../atoms/Div';
import Img from '../atoms/Img';
export default function GroupInfoImgContent(props) {
  const imgPaths = new ImgPaths();
  const path = props.isUser
    ? imgPaths.join(imgPaths.userAvatarsPath, props.imageId)
    : imgPaths.join(imgPaths.groupImgsPath, props.imageId);
  return (
    <Div className="m-0 p-0 col-3 row justify-content-center simpleImgContent">
      {/* <GroupInfoImg imageId={props.group.imageId} classes={props.imgClasses}/> */}
      <Img src={`/groupImgs/${props.group.imageId}.jpg`} alt="image" className={`column ${props.imgClasses}`} /*"simpleGroupImg"*//>
      <Img src={`${path}.jpg`} alt="image" className={props.imgClasses}/>
    </Div>
  );
}