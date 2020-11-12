import React, { Fragment, useState } from 'react';
import AddInvitationModalForm from '../Molecules/AddInvitationModalForm';
import SimpleGroupContent from '../Molecules/SimpleGroupContent';
import "./Modal.css"
export default function AddInvitationModal(props) {
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap">
        <h1 className="modal-title">Add invitation</h1>
        <AddInvitationModalForm
          simpleGroup={props.simpleGroup}
          selectedUser={props.selectedUser}
          simpleMe={props.simpleMe}
          onSubmitAddInvitation={props.onSubmitAddInvitation}
        />
      </div>
    </div>
  )
}