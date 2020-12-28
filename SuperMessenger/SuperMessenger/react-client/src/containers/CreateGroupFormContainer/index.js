import React, {useState} from 'react';
import CreateGroupForm from '../../components/organisms/CreateGroupForm';
import InvitationModel from '../../Models/InvitationModel';


export default function CreateGroupFormContainer({
  className,
  size,
  onChangeGroupName,
  onSubmitCreateGroup,
  groupType,
  selectedUsers,
  simpleMe,
  onChangeGroupType,
  canUseGroupName,
  onClickBackModal,
  onChangeSearchUsers,
}) {
  const [groupName, setGroupName] = useState("");
  const [groupImg, setGroupImg] = useState(null);

  function handleChangeGroupName(event) {
    onChangeGroupName(event.target.value);
    setGroupName(event.target.value);
  }
  function handleChangeGroupAvatar(event) {
    setGroupImg(event.target.files[0]);
  }
  function handleSubmitCreateGroup(event) {
    onSubmitCreateGroup(
      event,
      groupImg,
      groupType,
      groupName,
      selectedUsers.map(user => new InvitationModel(undefined, undefined, undefined, user, simpleMe)),
    )
  }
  return (
    <CreateGroupForm
      size={size}
      className={className}
      groupType={groupType}
      onChangeGroupType={onChangeGroupType}
      canUseGroupName={canUseGroupName}
      onClickBackModal={onClickBackModal}
      onChangeSearchUsers={onChangeSearchUsers}
      onSubmitCreateGroup={handleSubmitCreateGroup}
      onChangeGroupName={handleChangeGroupName}
      onChangeGroupAvatar={handleChangeGroupAvatar}
    />
  );
}