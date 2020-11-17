import React from 'react';
import GroupInfoMembersCount from '../Atoms/GroupInfoMembersCount';
import GroupInfoHead from './GroupInfoHead';
import Members from './Members';
import NavbarButton from './NavbarButton';
import SimpleContent from './SimpleContent';
export default function GroupInfo(props) {
  return (
    <div className="col-3 row m-0 flex-column">
      {/* <GroupInfoHead */}
      <SimpleContent
        id={props.groupData.id}
        simpleContentClasses="groupInfoContent"
        imgContentClasses="groupInfoContent"
        imgClasses="groupInfoImg" 
        simpleNameClasses="simpleName"
        isUser={false}
        imageId={props.groupData.imageId}
        name={props.groupData.name}
        bottomData={<GroupInfoMembersCount value={props.groupData.usersInGroup.length}/>}
      />
      {
        props.groupData.isCreator &&
        <NavbarButton
          title="Applications"
          type="acceptApplication"
          showSup={true}
          foo={true}
          applications={props.groupData.applications}
          value={props.groupData.applications.length}
          onClick={props.onClickOpenAcceptApplications}
        />
      }
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