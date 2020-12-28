import React from 'react';
import Div from '../../atoms/Div';
import Span from '../../atoms/Span';
import Members from '../../organisms/Members';
import StandardButton from '../../molecules/StandardButton';
import GroupType from '../../../Entities/Enums/GroupType';
import SimpleContentContainer from '../../../containers/SimpleContentContainer';

import styles from './style.module.css'

export default function GroupInfo({
  className,
  size,
  groupData,
  onClickLeaveGroup,
  onClickRemoveGroup,
  onClickOpenAcceptApplications,
  onClickAddMember,
}) {
  const classNames = [className, styles[size], "col-3", "row", "m-0", "flex-column"];
  return (
    <Div className={classNames.join(" ")}>
      <SimpleContentContainer
        id={groupData.id}
        simpleContentClasses="groupInfoContent"
        imgContentClasses="groupInfoContent"
        imgClasses="groupInfoImg" 
        simpleNameClasses="simpleName"
        isUser={groupData.type === GroupType.chat ? true : false}
        imageName={groupData.imageName}
        name={groupData.name}
        bottomData={
          groupData.type === GroupType.chat ? null :
          <Span className="groupInfoMembersCount m-0 p-0">{groupData.usersInGroup.length}</Span>
        }
      />
      
      <StandardButton
        title="Leave group"
        showSup={false}
        onClick={onClickLeaveGroup}
      />
      {
        groupData.isCreator &&
        <>
        <StandardButton
          title="Remove group"
          showSup={false}
          onClick={onClickRemoveGroup}
        />
        <StandardButton
          title="Applications"
          type="acceptApplication"
          showSup={true}
          value={groupData.applications.length}
          onClick={onClickOpenAcceptApplications}
          />
        </>
      }
      <Members
        isCreator={groupData.isCreator}
        imageName={groupData.imageName}
        groupName={groupData.name}
        groupType={groupData.type}
        groupId={groupData.id}
        usersInGroup={groupData.usersInGroup}
        onClickAddMember={onClickAddMember}
      />
    </Div>
  );
}