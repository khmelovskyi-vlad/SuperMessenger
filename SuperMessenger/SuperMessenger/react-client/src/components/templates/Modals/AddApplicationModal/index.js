import React from 'react';
import Title from '../../../atoms/Title';
import RequestToAddForm from '../../../molecules/RequestToAddForm'
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import Modal from '../Modal';



export default function AddApplicationModal({
  wrapperRef,
  onCreateApplication,
  onChangeApplication,
  onClickBackModal,
  onSubmitAddApplication,
}) {
  
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={wrapperRef}>
      <Title className="modal-title">Add application</Title>
      <RequestToAddForm
        onCreate={onCreateApplication}
        onChange={onChangeApplication}
        onClickBackModal={onClickBackModal}
        onSubmit={onSubmitAddApplication}
        name="addInvitation"
        labelValue="Write application"
        inputValue="send application"
      />
    </Modal>
  )
}