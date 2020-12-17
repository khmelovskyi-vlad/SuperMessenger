import React, {useState} from 'react';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';
import EnteringGroupName from '../../molecules/EnteringGroupName';
import SearchInformation from '../../molecules/SearchInformation';
import Upload from '../../molecules/Upload';
import SelectGroupType from '../../molecules/SelectGroupType';
import GroupType from '../../../containers/Enums/GroupType';
import InvitationModel from '../../../containers/Models/InvitationModel';

import styles from './style.module.css'

export default function CreateGroupForm(props) {
  const className = [props.className, styles[props.size], "column"];
  const [groupName, setGroupName] = useState("");
  const [groupImg, setGroupImg] = useState(null);

  function handleChangeGroupName(event) {
    props.onChangeGroupName(event.target.value);
    setGroupName(event.target.value);
  }
  function handleChangeGroupAvatar(event) {
    setGroupImg(event.target.files[0]);
  }
  
  return (
    <Form className={className.join(" ")}
      onSubmit={(e) => props.onSubmitCreateGroup(e,
        groupImg,
        props.groupType,
        groupName,
        props.selectedUsers.map(user => new InvitationModel(undefined, undefined, undefined, user, props.simpleMe)),
      )}>
      <SelectGroupType onChange={props.onChangeGroupType}/>
      {
        (props.groupType === GroupType.public || props.groupType === GroupType.private) &&
        <>
          <EnteringGroupName
            onChange={handleChangeGroupName}
            groupType={props.groupType}
            canUseGroupName={props.canUseGroupName}
          />
          <Upload onChange={handleChangeGroupAvatar} name={"groupAvatar"} />
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