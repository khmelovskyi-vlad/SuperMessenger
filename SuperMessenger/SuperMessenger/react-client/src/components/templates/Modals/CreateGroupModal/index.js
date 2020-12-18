import React, {useState} from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import CreateGroupForm from '../../../organisms/CreateGroupForm';
import SimpleContent from '../../../organisms/SimpleContent';
import StandardButton from '../../../molecules/StandardButton';
import GroupType from '../../../../containers/Enums/GroupType';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';



export default function CreateGroupModal(props) {
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
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">Create group</Title>
      <CreateGroupForm
        onClickBackModal={props.onClickBackModal}
        onChangeGroupName={props.onCheckGroupName}
        canUseGroupName={props.canUseGroupName}
        onChangeSearchUsers={handleChangeSearchUsers}
        onSubmitCreateGroup={props.onSubmitCreateGroup}
        selectedUsers={selectedUsers}
        simpleMe={props.simpleMe}
        groupType={groupType}
        onChangeGroupType={handleChangeGroupType}
      />
      <StandardButton
        title={showSelectedUsers ? "No selected users" : "Selected users"}
        showSup={true}
        value={showSelectedUsers ? props.foundUsers.length : selectedUsers.length}
        onClick={handleClickChangeShowSelectedUsers}
      />
      <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
        {
          needUsers.map(user =>
            <SimpleContent
              onClickSelectUser={handleClickSelectedUser}
              user={user}
              id={user.id}
              key={user.id}
              simpleContentClasses="simpleGroupContent"
              imgContentClasses="simpleImgContent"
              imgClasses="simpleImg" 
              simpleNameClasses="simpleName"
              isUser={true}
              imageName={user.imageName}
              name={user.email}
            />)
        }
      </Div>
    </Modal>
  )
}