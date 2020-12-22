import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import SimpleContentContainer from '../../../../containers/SimpleContentContainer';
import StandardButton from '../../../molecules/StandardButton';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import CreateGroupFormContainer from '../../../../containers/CreateGroupFormContainer';
import Modal from '../Modal';



export default function CreateGroupModal(props) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">Create group</Title>
      <CreateGroupFormContainer
        onClickBackModal={props.onClickBackModal}
        onChangeGroupName={props.onCheckGroupName}
        canUseGroupName={props.canUseGroupName}
        onChangeSearchUsers={props.onChangeSearchUsers}
        onSubmitCreateGroup={props.onSubmitCreateGroup}
        selectedUsers={props.selectedUsers}
        simpleMe={props.simpleMe}
        groupType={props.groupType}
        onChangeGroupType={props.onChangeGroupType}
      />
      <StandardButton
        title={props.title}
        showSup={true}
        value={props.needUsers.length}
        onClick={props.onClickChangeShowSelectedUsers}
      />
      <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
        {
          props.needUsers.map(user =>
            <SimpleContentContainer
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