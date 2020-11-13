import React, { useState } from 'react';
import Invitation from '../../Models/Invitation';
import SimpleUserModel from '../../Models/SimpleUserModel';
import "../Modals/Modal.css"
export default function AddInvitationModalForm(props) {
  const [invitation, setInvitation] = useState("");
  function handleOnChangeInvitation(e) {
    // console.log(e.target.value);
    setInvitation(e.target.value);
  }
  function createInvitation() {
    // const invitedUser = new SimpleUserModel();
    // const inviter = new SimpleUserModel();
    return new Invitation(invitation, undefined, props.simpleGroup, props.selectedUser, props.simpleMe);
    // return invitation;
  }
  return (
    <form className="row m-0 flex-column" onSubmit={(e) => props.onSubmitAddInvitation(e, createInvitation())}>
      <label className="modal-label " htmlFor="addInvitation">Write invitation</label>
      <textarea className="modal-textarea" rows="4" maxLength="150" type="text" name="addInvitation" onChange={handleOnChangeInvitation}/>
      <input className="modal-input" type="submit" value="send invitation"/>
    </form>
  )
}