import React from 'react';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';
import EnteringGroupName from '../../molecules/EnteringGroupName';
import SearchInformation from '../../molecules/SearchInformation';
import Upload from '../../molecules/Upload';
import SelectGroupType from '../../molecules/SelectGroupType';
import GroupType from '../../../Entities/Enums/GroupType';

import styles from './style.module.css'

export default function CreateGroupForm({
  className,
  size,
  onSubmitCreateGroup,
  onChangeGroupType,
  groupType,
  onChangeGroupName,
  canUseGroupName,
  onChangeGroupAvatar,
  onClickBackModal,
  onChangeSearchUsers,
}) {
  const classNames = [className, styles[size], "column"];
  
  return (
    <Form className={classNames.join(" ")}
      onSubmit={onSubmitCreateGroup}>
      <SelectGroupType onChange={onChangeGroupType}/>
      {
        (groupType === GroupType.public || groupType === GroupType.private) &&
        <>
          <EnteringGroupName
            onChange={onChangeGroupName}
            groupType={groupType}
            canUseGroupName={canUseGroupName}
          />
          <Upload onChange={onChangeGroupAvatar} name={"groupAvatar"} />
        </>
      }
      <SearchInformation
          name="searchUser"
          value="Write email"
          onClickBackModal={onClickBackModal} 
          onChange={onChangeSearchUsers}
      />
      <Input type="submit" class="m-1" />
    </Form>
  );
}