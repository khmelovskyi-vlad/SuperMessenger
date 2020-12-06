import React, {useState} from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import RequestToAddForm from '../../../molecules/RequestToAddForm'
import Invitation from '../../../../containers/Models/Invitation';
// import "./Modal.css"


import styles from './style.module.css'

export default function AddInvitationModal(props) {
  const [invitation, setInvitation] = useState("");
  function handleOnChangeInvitation(e) {
    setInvitation(e.target.value);
  }
  function createInvitation() {
    return new Invitation(invitation, undefined, props.simpleGroup, props.selectedUser, props.simpleMe);
  }
  
  return (
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
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
      </Div>
    </Div>
  )
}