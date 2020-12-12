import React, {useState} from 'react';
import Button from '../../../atoms/Button';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import Invitation from '../../../../containers/Models/Invitation';
import CreateGroupForm from '../../../organisms/CreateGroupForm';
import SimpleContent from '../../../organisms/SimpleContent';
import StandardButton from '../../../molecules/StandardButton';
// import "./Modal.css"


import styles from './style.module.css'

export default function CreateGroupModal(props) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSelectedUsers, setShowSelectedUsers] = useState(false);
  const [userEmailPart, setUserEmailPart] = useState("");
  function handleClickSelectedUser(user) {
    // setInvitations(prevInviations => {
    //     prevInviations.push(new Invitation(undefined, undefined, undefined, user, props.simpleMe));
    //     return {...prevInviations};
    //   }
    // )
    if (showSelectedUsers) {
      setSelectedUsers(prevSelectedUsers => {
        prevSelectedUsers = prevSelectedUsers.filter(selectedUser => selectedUser.id != user.id);
        props.onChangeSearchUsers(userEmailPart, prevSelectedUsers.map(user => user.id));
        return [...prevSelectedUsers];
      });
    }
    else {
      setSelectedUsers(prevSelectedUsers => {
        prevSelectedUsers.push(user);
        props.onChangeSearchUsers(userEmailPart, prevSelectedUsers.map(user => user.id));
        return [...prevSelectedUsers];
      });
    }
    // setInvitations(prevInviations =>
    //   [...prevInviations, new Invitation(undefined, undefined, undefined, user, props.simpleMe)])
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
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">Create group</Title>
        <CreateGroupForm
          onClickBackModal={props.onClickBackModal}
          onChangeGroupName={props.onCheckGroupName}
          canUseGroupName={props.canUseGroupName}
          onChangeSearchUsers={handleChangeSearchUsers}
          onSubmitCreateGroup={props.onSubmitCreateGroup}
          selectedUsers={selectedUsers}
          simpleMe={props.simpleMe}
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
                // selectedGroupOnClick={props.onClickCloseModal}
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
      </Div>
    </Div>
  )
}