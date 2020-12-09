import React from 'react';
import Div from '../../atoms/Div';
import Span from '../../atoms/Span';
import Members from '../../organisms/Members';
import StandardButton from '../../molecules/StandardButton';
import SimpleContent from '../../organisms/SimpleContent';

import styles from './style.module.css'

export default function GroupInfo(props) {
  return (
    <Div className="col-3 row m-0 flex-column">
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
        bottomData={<Span className="groupInfoMembersCount m-0 p-0">{props.groupData.usersInGroup.length}</Span>}
      />
      
      <StandardButton
        title="Leave group"
        showSup={false}
        onClick={props.onClickLeaveGroup}
      />
      {
        props.groupData.isCreator &&
        <>
        <StandardButton
          title="Remove group"
          showSup={false}
          onClick={props.onClickRemoveGroup}
        />
        <StandardButton
          title="Applications"
          type="acceptApplication"
          showSup={true}
          // foo={true}
          applications={props.groupData.applications}
          value={props.groupData.applications.length}
          onClick={props.onClickOpenAcceptApplications}
          />
        </>
      }
      <Members
        isCreator={props.groupData.isCreator}
        imageId={props.groupData.imageId}
        groupName={props.groupData.name}
        groupType={props.groupData.type}
        groupId={props.groupData.id}
        onClickNewMember={props.onClickNewMember}
        usersInGroup={props.groupData.usersInGroup}
        onClickAddMember={props.onClickAddMember}
      />
    </Div>
  );
}