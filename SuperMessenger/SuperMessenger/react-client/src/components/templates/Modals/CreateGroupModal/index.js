import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import SimpleContentContainer from '../../../../containers/SimpleContentContainer';
import StandardButton from '../../../molecules/StandardButton';
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import CreateGroupFormContainer from '../../../../containers/CreateGroupFormContainer';
import Modal from '../Modal';



export default function CreateGroupModal({
  wrapperRef,
  onClickBackModal,
  onCheckGroupName,
  canUseGroupName,
  onChangeSearchUsers,
  onSubmitCreateGroup,
  selectedUsers,
  simpleMe,
  groupType,
  onChangeGroupType,
  title,
  needUsers,
  onClickChangeShowSelectedUsers,
  onClickSelectedUser,
}) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={wrapperRef}>
      <Title className="modal-title">Create group</Title>
      <CreateGroupFormContainer
        onClickBackModal={onClickBackModal}
        onChangeGroupName={onCheckGroupName}
        canUseGroupName={canUseGroupName}
        onChangeSearchUsers={onChangeSearchUsers}
        onSubmitCreateGroup={onSubmitCreateGroup}
        selectedUsers={selectedUsers}
        simpleMe={simpleMe}
        groupType={groupType}
        onChangeGroupType={onChangeGroupType}
      />
      <StandardButton
        title={title}
        showSup={true}
        value={needUsers.length}
        onClick={onClickChangeShowSelectedUsers}
      />
      <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
        {
          needUsers.map(user =>
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