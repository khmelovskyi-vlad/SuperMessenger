import React, { useEffect, useState } from 'react';
import useOutsideModal from '../../hooks/useOutsideModal';
import CreateGroupModal from '../../components/templates/Modals/CreateGroupModal';
import GroupType from '../../Entities/Enums/GroupType';
import NewGroupModel from '../../Models/NewGroupModel';
import { receiveCheckGroupNamePartResult } from '../../Api/Hendlers/GroupHandlers';
import { searchUsers } from '../../Api/Services/SuperMessengerServices';
import { checkGroupNamePart, createGroup } from '../../Api/Services/GroupServices';
import { postNewGroup } from '../../Api/FileApi';




export default function CreateGroupModalContainer({
    connections,
    setRenderLoader,
    setRenderCreateGroupModalContainer,
    renderCreateGroupModalContainer,
    simpleMe,
    foundUsers,
    setFoundUsers,
  }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSelectedUsers, setShowSelectedUsers] = useState(false);
  const [userEmailPart, setUserEmailPart] = useState("");
  const [groupType, setGroupType] = useState(GroupType.public);
  const [canUseGroupName, setCanUseGroupName] = useState(null);
  const [wrapperRef, setOpenModals] = useOutsideModal(handleClickCloseModal);


  useEffect(() => {
    if (connections) {
      receiveCheckGroupNamePartResult(handleReceiveCheckGroupNamePartResult);
    }
  }, [connections]);

  function handleClickCloseModal(openModals) {
    clearData();
  };
  function handleReceiveCheckGroupNamePartResult(canUseGroupName) {
    setCanUseGroupName(canUseGroupName);
  }

  function handleChangeGroupType(event) {
    const newChatType = event.target.value;
    if (newChatType === GroupType.chat && selectedUsers.length > 0) {
      setSelectedUsers(prevSelectedUsers => {
        prevSelectedUsers = [prevSelectedUsers[0]];
        onChangeSearchUsers(userEmailPart, prevSelectedUsers.map(user => user.id));
        return [...prevSelectedUsers];
      });
    }
    setGroupType(newChatType);
  }
  function handleClickSelectedUser(user) {
    if (showSelectedUsers) {
      setSelectedUsers(prevSelectedUsers => {
        prevSelectedUsers = prevSelectedUsers.filter(selectedUser => selectedUser.id !== user.id);
        onChangeSearchUsers(userEmailPart, prevSelectedUsers.map(user => user.id));
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
        onChangeSearchUsers(userEmailPart, prevSelectedUsers.map(user => user.id));
        return [...prevSelectedUsers];
      });
    }
  }
  function handleClickChangeShowSelectedUsers() {
    setShowSelectedUsers(prevShowSelectedUsers => !prevShowSelectedUsers);
  }
  function handleChangeSearchUsers(e) {
    setUserEmailPart(e.target.value);
    onChangeSearchUsers(e.target.value, selectedUsers.map(user => user.id));
  }
  function onChangeSearchUsers(userEmailPart, userIds) {
    searchUsers(userEmailPart, userIds);
  }
  const needUsers = showSelectedUsers ? selectedUsers : foundUsers;

  function handleClickBackModal() {
    clearData();
  }

  function handleCheckGroupName(groupNamePart) {
    checkGroupNamePart(groupNamePart);
  }

  function handleSubmitCreateGroup(event, groupImg, groupType, groupName, invitations) {
    if (groupType.length <= 0
      || (groupType !== GroupType.chat && groupName.length > 0)
      || (groupType !== GroupType.chat && canUseGroupName)
      || (groupType === GroupType.chat && invitations.length === 1)) {
      const newGroupModel = new NewGroupModel();
      setRenderLoader(true);
      clearData();
      newGroupModel.name = groupName;
      newGroupModel.type = groupType;
      newGroupModel.invitations = invitations;
      if (groupImg && groupType !== GroupType.chat) {
        newGroupModel.haveImage = true;
        const formData = new FormData();
        formData.append("groupImg", groupImg);
        postNewGroup(formData, newGroupModel, createGroup);
      }
      else {
        newGroupModel.haveImage = false;
        createGroup(newGroupModel);
      }
    }
    event.preventDefault();
  }

  function clearData() {
    setRenderCreateGroupModalContainer(false);
    setShowSelectedUsers(false);
    setUserEmailPart("");
    setSelectedUsers([]);
    setGroupType(GroupType.public);
    setCanUseGroupName(null);
    setFoundUsers([]);
  }

  return (
    <>
      {
        renderCreateGroupModalContainer &&
        <CreateGroupModal
          wrapperRef={wrapperRef}
          onClickBackModal={handleClickBackModal}
          onCheckGroupName={handleCheckGroupName}
          canUseGroupName={canUseGroupName}
          onSubmitCreateGroup={handleSubmitCreateGroup}
          simpleMe={simpleMe}

          onChangeGroupType={handleChangeGroupType}
          onClickSelectedUser={handleClickSelectedUser}
          onClickChangeShowSelectedUsers={handleClickChangeShowSelectedUsers}
          onChangeSearchUsers={handleChangeSearchUsers}
          needUsers={needUsers}
          groupType={groupType}
          selectedUsers={selectedUsers}
          title={showSelectedUsers ? "No selected users" : "Selected users"}
        />
      }
    </>

  )
}