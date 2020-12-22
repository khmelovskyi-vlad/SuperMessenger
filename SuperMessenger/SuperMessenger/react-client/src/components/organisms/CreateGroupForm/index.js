import React from 'react';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';
import EnteringGroupName from '../../molecules/EnteringGroupName';
import SearchInformation from '../../molecules/SearchInformation';
import Upload from '../../molecules/Upload';
import SelectGroupType from '../../molecules/SelectGroupType';
import GroupType from '../../../containers/Enums/GroupType';

import styles from './style.module.css'

export default function CreateGroupForm(props) {
  const className = [props.className, styles[props.size], "column"];
  
  return (
    <Form className={className.join(" ")}
      onSubmit={props.onSubmitCreateGroup}>
      <SelectGroupType onChange={props.onChangeGroupType}/>
      {
        (props.groupType === GroupType.public || props.groupType === GroupType.private) &&
        <>
          <EnteringGroupName
            onChange={props.onChangeGroupName}
            groupType={props.groupType}
            canUseGroupName={props.canUseGroupName}
          />
          <Upload onChange={props.onChangeGroupAvatar} name={"groupAvatar"} />
        </>
      }
      <SearchInformation
          name="searchUser"
          value="Write email"
          onClickBackModal={props.onClickBackModal} 
          onChange={props.onChangeSearchUsers}
      />
      <Input type="submit" class="m-1" />
    </Form>
  );
}