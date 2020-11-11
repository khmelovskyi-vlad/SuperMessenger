import React from 'react';
import GroupInfoImg from '../Atoms/GroupInfoImg';
import SimpleImg from '../Atoms/SimpleImg';
export default function GroupInfoImgContent(props) {
  return (
    <div className="m-0 p-0 col-3 row justify-content-center simpleImgContent">
      <GroupInfoImg imageId={props.group.imageId} classes={props.imgClasses}/>
      <SimpleImg imageId={props.imageId} classes={props.imgClasses}/>
    </div>
  );
}