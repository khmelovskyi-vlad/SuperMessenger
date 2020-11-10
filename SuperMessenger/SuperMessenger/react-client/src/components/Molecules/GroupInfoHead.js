import React from 'react';
import GroupInfoImg from '../Atoms/GroupInfoImg';
import GroupInfoName from '../Atoms/GroupInfoName';
import GroupInfoMembersCount from '../Atoms/GroupInfoMembersCount';
export default function GroupInfoHead(props) {
  return (
    <div className="column row m-1">
      <GroupInfoImg imageId={props.group.imageId}/>
      <div  className="column row m-0 flex-column">
        <GroupInfoName value={props.group.name}/>
        <GroupInfoMembersCount value={props.group.usersInGroup.length}/>
      </div>
    </div>
  );
}