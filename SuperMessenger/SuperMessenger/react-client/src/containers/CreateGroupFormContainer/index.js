import React, {useState} from 'react';
import CreateGroupForm from '../../components/organisms/CreateGroupForm';
import InvitationModel from '../Models/InvitationModel';


export default function CreateGroupFormContainer(props) {
  const [groupName, setGroupName] = useState("");
  const [groupImg, setGroupImg] = useState(null);

  function handleChangeGroupName(event) {
    props.onChangeGroupName(event.target.value);
    setGroupName(event.target.value);
  }
  function handleChangeGroupAvatar(event) {
    setGroupImg(event.target.files[0]);
  }
  function handleSubmitCreateGroup(event) {
    props.onSubmitCreateGroup(
      event,
      groupImg,
      props.groupType,
      groupName,
      props.selectedUsers.map(user => new InvitationModel(undefined, undefined, undefined, user, props.simpleMe)),
    )
  }
  return (
    <CreateGroupForm
      size={props.size}
      className={props.className}
      groupType={props.groupType}
      onChangeGroupType={props.onChangeGroupType}
      canUseGroupName={props.canUseGroupName}
      onClickBackModal={props.onClickBackModal}
      onChangeSearchUsers={props.onChangeSearchUsers}
      onSubmitCreateGroup={handleSubmitCreateGroup}
      onChangeGroupName={handleChangeGroupName}
      onChangeGroupAvatar={handleChangeGroupAvatar}
    />
  );
}