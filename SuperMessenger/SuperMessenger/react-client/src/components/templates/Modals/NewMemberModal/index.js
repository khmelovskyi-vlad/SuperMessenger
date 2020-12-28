import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import SearchInformation from '../../../molecules/SearchInformation';
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import Modal from '../Modal';
import SimpleContentContainer from '../../../../containers/SimpleContentContainer';



export default function NewMemberModal({
  wrapperRef,
  onClickBackModal,
  onChangeSearchNoInvitedUsers,
  foundUsers,
  onClickSelectedUser,
}) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={wrapperRef}>
      <Title className="modal-title">Search user</Title>
      <SearchInformation
        name="searchUser"
        value="Write email"
        onClickBackModal={onClickBackModal}
        onChange={onChangeSearchNoInvitedUsers}
      />
      <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
        {
          foundUsers && foundUsers.map(user =>
            <SimpleContentContainer
              onClickSelectUser={onClickSelectedUser}
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