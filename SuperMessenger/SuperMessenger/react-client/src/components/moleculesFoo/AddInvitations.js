import React, { useState } from 'react';
import Form from '../atoms/Form';
import SelectGroupId from '../molecules/SelectGroupId';
export default function AddInvitations(props){
  const [invitation, setInvitation] = useState("");
  const [groupId, setGroupId] = useState("");
  const [invitedUserId, setInvitedUserId] = useState("");
  // const group = useRef(new NewGroup());
  function handleChangeInvitation(event) {
    setInvitation(event.target.value);
  }
  function handleChangeGroupId(event) {
    setGroupId(event.target.value);
  }
  function handleChangeInvitedUserId(event) {
    setInvitedUserId(event.target.value);
  }
  function handleOnSubmit(event) {
    if (invitation.length > 0 && groupId.length > 0 && invitedUserId.length  > 0) {
      props.api.current.changeProfile(invitation, groupId, invitedUserId);
    }
    event.preventDefault();
  }
  return (
    <Form className="col-8 p-0"
      onSubmit={handleOnSubmit}>
      {/* <input onChange={handleChangeInvitation}/>
      <SelectGroupId onChange={handleChangeGroupId} groups={props.groups}/>
      <Upload onChange={handleChangeAvatar} name="newProfileAvatar"/>
      <Input type="submit" class="m-1" /> */}
    </Form>
  );
}