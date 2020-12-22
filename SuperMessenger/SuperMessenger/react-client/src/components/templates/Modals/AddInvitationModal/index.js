import React from 'react';
import Title from '../../../atoms/Title';
import RequestToAddForm from '../../../molecules/RequestToAddForm'
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';


export default function AddInvitationModal(props) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">Add invitation</Title>
      <RequestToAddForm
        onCreate={props.onCreateInvitation}
        onChange={props.onChangeInvitation}
        onClickBackModal={props.onClickBackModal}
        onSubmit={props.onSubmitAddInvitation}
        name="addApplication"
        labelValue="Write invitation"
        inputValue="send invitation"
      />
    </Modal>
  )
}