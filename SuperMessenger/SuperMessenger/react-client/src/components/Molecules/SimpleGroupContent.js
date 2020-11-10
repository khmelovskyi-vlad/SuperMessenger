import React from 'react';
import SimpleName from '../Atoms/SimpleName';
import LastMesssageContent from './LastMessageContent';
import SimpleImgContent from './SimpleImgContent';
import SimpleImg from '../Atoms/SimpleImg';
export default function SimpleGroupContent(props) {
  return (
    <div className="column simpleGroupContent row m-1 p-0" onClick={() => props.selectedGroupOnClick(props.groupId)}>
      {/* <SimpleGroupImgContent imageId={props.group.imageId }/> */}
      <SimpleImgContent imgClasses={"simpleImg"} imageId={props.group.imageId}/>
      <div className="col-8 p-0 row flex-column m-0">
        <SimpleName value={props.group.name} classes="simpleName"/>
        <LastMesssageContent lastMesssage={props.group.lastMesssage}/>
      </div>
    </div>
  );
}