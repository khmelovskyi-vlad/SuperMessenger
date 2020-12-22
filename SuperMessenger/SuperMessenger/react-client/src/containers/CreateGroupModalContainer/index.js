import React, { useState } from 'react';
import CreateGroupModal from '../../components/templates/Modals/CreateGroupModal';
import GroupType from '../Enums/GroupType';




export default function CreateGroupModalContainer(props) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSelectedUsers, setShowSelectedUsers] = useState(false);
  const [userEmailPart, setUserEmailPart] = useState("");
  const [groupType, setGroupType] = useState(GroupType.public);
  function handleChangeGroupType(event) {
    const newChatType = event.target.value;
    if (newChatType === GroupType.chat && selectedUsers.length > 0) {
      setSelectedUsers(prevSelectedUsers => {
        prevSelectedUsers = [prevSelectedUsers[0]];
        props.onChangeSearchUsers(userEmailPart, prevSelectedUsers.map(user => user.id));
        return [...prevSelectedUsers];
      });
    }
    setGroupType(newChatType);
  }
  function handleClickSelectedUser(user) {
    if (showSelectedUsers) {
      setSelectedUsers(prevSelectedUsers => {
        prevSelectedUsers = prevSelectedUsers.filter(selectedUser => selectedUser.id !== user.id);
        props.onChangeSearchUsers(userEmailPart, prevSelectedUsers.map(user => user.id));
        return [...prevSelectedUsers];
      });
    }
    else {
      setSelectedUsers(prevSelectedUsers => {
        if (groupType === GroupType.chat) {
          prevSelectedUsers = [user];
        }
        else {
          prevSelectedUsers.push(user);
        }
        props.onChangeSearchUsers(userEmailPart, prevSelectedUsers.map(user => user.id));
        return [...prevSelectedUsers];
      });
    }
  }
  function handleClickChangeShowSelectedUsers() {
    setShowSelectedUsers(prevShowSelectedUsers => !prevShowSelectedUsers);
  }
  function handleChangeSearchUsers(e) {
    setUserEmailPart(e.target.value);
    props.onChangeSearchUsers(e.target.value, selectedUsers.map(user => user.id));
  }
  const needUsers = showSelectedUsers ? selectedUsers : props.foundUsers;
  return (
    <CreateGroupModal
      wrapperRef={props.wrapperRef}
      onClickBackModal={props.onClickBackModal}
      onCheckGroupName={props.onCheckGroupName}
      canUseGroupName={props.canUseGroupName}
      onSubmitCreateGroup={props.onSubmitCreateGroup}
      simpleMe={props.simpleMe}
      
      onChangeGroupType={handleChangeGroupType}
      onClickSelectedUser={handleClickSelectedUser}
      onClickChangeShowSelectedUsers={handleClickChangeShowSelectedUsers}
      onChangeSearchUsers={handleChangeSearchUsers}
      needUsers={needUsers}
      groupType={groupType}
      selectedUsers={selectedUsers}
      title={showSelectedUsers ? "No selected users" : "Selected users"}
    />
  )
}