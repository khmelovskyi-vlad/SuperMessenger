import React, {useState} from 'react';
import AddInvitationModal from '../../components/templates/Modals/AddInvitationModal';
import InvitationModel from '../Models/InvitationModel';


export default function AddInvitationModalContainer(props) {
  const [invitation, setInvitation] = useState("");
  function handleChangeInvitation(e) {
    setInvitation(e.target.value);
  }
  function handleCreateInvitation() {
    return new InvitationModel(invitation, undefined, props.simpleGroup, props.selectedUser, props.simpleMe);
  }
  
  return (
    <AddInvitationModal
      wrapperRef={props.wrapperRef}
      onClickBackModal={props.onClickBackModal}
      onSubmitAddInvitation={props.onSubmitAddInvitation}
      onChangeInvitation={handleChangeInvitation}
      onCreateInvitation={handleCreateInvitation}
    />
  )
}