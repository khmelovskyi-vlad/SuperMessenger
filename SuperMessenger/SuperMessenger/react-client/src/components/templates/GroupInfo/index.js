import React from 'react';
import Div from '../../atoms/Div';
import Span from '../../atoms/Span';
import Members from '../../organisms/Members';
import StandardButton from '../../molecules/StandardButton';
import GroupType from '../../../containers/Enums/GroupType';
import SimpleContentContainer from '../../../containers/SimpleContentContainer';

import styles from './style.module.css'

export default function GroupInfo(props) {
  const className = [props.className, styles[props.size], "col-3", "row", "m-0", "flex-column"];
  return (
    <Div className={className.join(" ")}>
      <SimpleContentContainer
        id={props.groupData.id}
        simpleContentClasses="groupInfoContent"
        imgContentClasses="groupInfoContent"
        imgClasses="groupInfoImg" 
        simpleNameClasses="simpleName"
        isUser={props.groupData.type === GroupType.chat ? true : false}
        imageName={props.groupData.imageName}
        name={props.groupData.name}
        bottomData={
          props.groupData.type === GroupType.chat ? null :
          <Span className="groupInfoMembersCount m-0 p-0">{props.groupData.usersInGroup.length}</Span>
        }
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
          applications={props.groupData.applications}
          value={props.groupData.applications.length}
          onClick={props.onClickOpenAcceptApplications}
          />
        </>
      }
      <Members
        isCreator={props.groupData.isCreator}
        imageName={props.groupData.imageName}
        groupName={props.groupData.name}
        groupType={props.groupData.type}
        groupId={props.groupData.id}
        usersInGroup={props.groupData.usersInGroup}
        onClickAddMember={props.onClickAddMember}
      />
    </Div>
  );
}