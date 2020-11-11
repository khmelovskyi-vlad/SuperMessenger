import React from 'react';
import GroupInfoMembersCount from '../Atoms/GroupInfoMembersCount';
import GroupInfoHead from './GroupInfoHead';
import Members from './Members';
import SimpleGroupContent from './SimpleGroupContent';
export default function GroupInfo(props) {
  return (
    <div className="col-3 row m-0 flex-column">
      {/* <GroupInfoHead */}
      <SimpleGroupContent
        groupId={props.groupData.id}
        groupContentClasses="groupInfoContent"
        imgContentClasses="groupInfoContent"
        imgClasses="groupInfoImg" 
        simpleNameClasses="simpleName"
        isUser={false}
        imageId={props.groupData.imageId}
        name={props.groupData.name}
        bottomData={<GroupInfoMembersCount value={props.groupData.usersInGroup.length}/>}
      />
      <Members
        isCreator={props.groupData.isCreator}
        imageId={props.groupData.imageId}
        groupName={props.groupData.name}
        groupId={props.groupData.id}
        onClickNewMember={props.onClickNewMember}
        usersInGroup={props.groupData.usersInGroup}
        onClickAddMember={props.onClickAddMember}
      />
    </div>
  );
}