import React, {useState} from 'react';
import Title from '../../../atoms/Title';
import RequestToAddForm from '../../../molecules/RequestToAddForm'
import InvitationModel from '../../../../containers/Models/InvitationModel';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';


export default function AddInvitationModal(props) {
  const [invitation, setInvitation] = useState("");
  function handleOnChangeInvitation(e) {
    setInvitation(e.target.value);
  }
  function createInvitation() {
    return new InvitationModel(invitation, undefined, props.simpleGroup, props.selectedUser, props.simpleMe);
  }
  
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">Add invitation</Title>
      <RequestToAddForm
        create={createInvitation}
        onChange={handleOnChangeInvitation}
        onClickBackModal={props.onClickBackModal}
        onSubmit={props.onSubmitAddInvitation}
        name="addApplication"
        labelValue="Write invitation"
        inputValue="send invitation"
      />
    </Modal>
  )
}