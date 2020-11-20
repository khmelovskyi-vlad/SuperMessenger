import React, { useState } from 'react';
import Invitation from '../../containers/Models/Invitation';
import Form from '../atoms/Form';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Textarea from '../atoms/Textarea';
import "../Modals/Modal.css"
export default function AddInvitationModalFormFoo(props) {
  const [invitation, setInvitation] = useState("");
  function handleOnChangeInvitation(e) {
    setInvitation(e.target.value);
  }
  function createInvitation() {
    return new Invitation(invitation, undefined, props.simpleGroup, props.selectedUser, props.simpleMe);
  }
  return (
    <Form className="row m-0 flex-column" onSubmit={(e) => props.onSubmitAddInvitation(e, createInvitation())}>
      <Label className="modal-label " htmlFor="addInvitation">Write invitation</Label>
      <Textarea
        className="modal-textarea"
        rows="4"
        maxLength="150"
        type="text"
        name="addInvitation"
        onChange={handleOnChangeInvitation}
      />
      <Input className="modal-input" type="submit" value="send invitation"/>
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
    </Form>
  )
}