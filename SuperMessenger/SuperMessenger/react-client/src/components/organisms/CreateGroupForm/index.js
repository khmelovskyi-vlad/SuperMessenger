import React, {useState} from 'react';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';
import EnteringGroupName from '../../molecules/EnteringGroupName';
import SearchInformation from '../../molecules/SearchInformation';
import Upload from '../../molecules/Upload';
import SelectGroupType from '../../molecules/SelectGroupType';
import GroupType from '../../../containers/Enums/GroupType';

import styles from './style.module.css'

export default function CreateGroupForm(props) {
  const [groupType, setGroupType] = useState(GroupType.public);
  const [groupName, setGroupName] = useState("");
  const [groupImg, setGroupImg] = useState(null);

  function handleChangeGroupType(event) {
    setGroupType(event.target.value);
  }
  function handleChangeGroupName(event) {
    props.onChangeGroupName(event.target.value);
    setGroupName(event.target.value);
  }
  function handleChangeGroupAvatar(event) {
    setGroupImg(event.target.files[0]);
  }
  
  return (
    <Form className="column"
      onSubmit={(e) => props.onSubmitCreateGroup(e, groupImg, groupType, groupName, props.invitations)}>
      <SelectGroupType onChange={handleChangeGroupType}/>
      {
        (groupType === GroupType.public || groupType === GroupType.private) &&
        <>
          <EnteringGroupName
            onChange={handleChangeGroupName}
            groupType={groupType}
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