import React from 'react';
import SimpleName from '../Atoms/SimpleName';
import LastMesssageContent from './LastMessageContent';
import SimpleImgContent from './SimpleImgContent';
import SimpleImg from '../Atoms/SimpleImg';
export default function SimpleGroupContent(props) {
  const classList = ["column", "row", "m-1", "p-0", props.groupContentClasses];
  return (
    <div className={classList.join(" ")}
      onClick={ props.selectedGroupOnClick ? () => props.selectedGroupOnClick(props.groupId) : null}
    >
      {/* <SimpleGroupImgContent imageId={props.group.imageId }/> */}
      <SimpleImgContent
        classes={props.imgContentClasses}
        imgClasses={props.imgClasses}
        imageId={props.imageId}
        isUser={props.isUser}
      />
      <div className="m-0 p-0 col-1">
      </div>
      <div className="col-8 p-0 row flex-column m-0">
        <SimpleName value={props.name} classes={props.simpleNameClasses} />
        {props.bottomData}
        {/* <LastMesssageContent lastMesssage={props.group.lastMesssage}/> */}
      </div>
    </div>
  );
}