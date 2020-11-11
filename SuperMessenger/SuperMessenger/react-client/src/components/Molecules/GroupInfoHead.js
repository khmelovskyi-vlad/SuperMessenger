import React from 'react';
import GroupInfoImg from '../Atoms/GroupInfoImg';
import GroupInfoName from '../Atoms/GroupInfoName';
import GroupInfoMembersCount from '../Atoms/GroupInfoMembersCount';
import GroupInfoImgContent from './GroupInfoImgContent';
import SimpleImgContent from './SimpleImgContent';
import SimpleName from '../Atoms/SimpleName';
export default function GroupInfoHead(props) {
  return (
    <div className="column groupInfoContent row m-1 p-0">
      <SimpleImgContent imgClasses="groupInfoImg" classes="groupInfoContent" imageId={props.group.imageId}/>
      {/* <GroupInfoImgContent imgClasses={"groupInfoImg"} imageId={props.group.imageId}/> */}
      <div className="m-0 p-0 col-1">
      </div>
      <div  className="col-8 p-0 row flex-column m-0">
        <SimpleName value={props.group.name} classes="groupInfoName"/>
        {/* <GroupInfoName value={props.group.name}/> */}
        <GroupInfoMembersCount value={props.group.usersInGroup.length}/>
      </div>
    </div>
  );
}