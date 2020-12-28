import React from 'react';
import Title from '../../../atoms/Title';
import RequestToAddForm from '../../../molecules/RequestToAddForm'
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import Modal from '../Modal';


export default function AddInvitationModal({
  wrapperRef,
  onCreateInvitation,
  onChangeInvitation,
  onClickBackModal,
  onSubmitAddInvitation,
}) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={wrapperRef}>
      <Title className="modal-title">Add invitation</Title>
      <RequestToAddForm
        onCreate={onCreateInvitation}
        onChange={onChangeInvitation}
        onClickBackModal={onClickBackModal}
        onSubmit={onSubmitAddInvitation}
        name="addApplication"
        labelValue="Write invitation"
        inputValue="send invitation"
      />
    </Modal>
  )
}