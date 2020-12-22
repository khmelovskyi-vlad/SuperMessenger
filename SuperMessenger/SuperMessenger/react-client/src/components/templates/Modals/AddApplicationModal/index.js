import React from 'react';
import Title from '../../../atoms/Title';
import RequestToAddForm from '../../../molecules/RequestToAddForm'
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';



export default function AddApplicationModal(props) {
  
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">Add application</Title>
      <RequestToAddForm
        onCreate={props.onCreateApplication}
        onChange={props.onChangeApplication}
        onClickBackModal={props.onClickBackModal}
        onSubmit={props.onSubmitAddApplication}
        name="addInvitation"
        labelValue="Write application"
        inputValue="send application"
      />
    </Modal>
  )
}