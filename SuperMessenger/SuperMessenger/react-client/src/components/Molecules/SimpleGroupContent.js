import React from 'react';
import SimpleGroupName from '../Atoms/SimpleGroupName';
import LastMesssageContent from './LastMessageContent';
import SimpleGroupImgContent from './SimpleGroupImgContent';
export default function SimpleGroupContent(props) {
  return (
    <div className="column simpleGroupContent row m-1 p-0" onClick={() => props.selectedGroupOnClick(props.groupId) }>
      <SimpleGroupImgContent imageId={props.group.imageId }/>
      <div className="col-8 p-0 row flex-column m-0">
        <SimpleGroupName value={props.group.name}/>
        <LastMesssageContent lastMesssage={props.group.lastMesssage}/>
      </div>
    </div>
  );
}