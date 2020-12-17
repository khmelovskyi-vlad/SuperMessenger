import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import SimpleContent from '../../../organisms/SimpleContent';
import SearchInformation from '../../../molecules/SearchInformation';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';



export default function NewMemberModal(props) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">Search user</Title>
      <SearchInformation
        name="searchUser"
        value="Write email"
        onClickBackModal={props.onClickBackModal}
        onChange={props.onChangeSearchNoInvitedUsers}
      />
      <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
        {
          props.foundUsers && props.foundUsers.map(user =>
            <SimpleContent
              onClickSelectUser={props.onClickSelectedUser}
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