import React, { Fragment, useState } from 'react';
import AddInvitationModalForm from '../Molecules/AddInvitationModalForm';
import "./Modal.css"
export default function AddInvitationModal(props) {
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <h1 className="modal-title">Add invitation</h1>
        <AddInvitationModalForm
          onClickBackModal={props.onClickBackModal}
          simpleGroup={props.simpleGroup}
          selectedUser={props.selectedUser}
          simpleMe={props.simpleMe}
          onSubmitAddInvitation={props.onSubmitAddInvitation}
        />
      </div>
    </div>
  )
}