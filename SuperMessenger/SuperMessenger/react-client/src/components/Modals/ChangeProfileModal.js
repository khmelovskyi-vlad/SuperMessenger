import React, {useState} from 'react'
import Invitation from '../../Models/Invitation';
import InvitationModel from '../../Models/InvitationModel';
import ChangeProfileForm from '../Molecules/ChangeProfileForm';
import CreateGroupForm from '../Molecules/CreateGroupForm'
import SimpleContent from '../Molecules/SimpleContent';
import "./Modal.css"
export default function ChangeProfileModal(props) {
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap">
        <h1 className="modal-title">Change profile</h1>
        <ChangeProfileForm
          onSubmitChangeProfile={props.onSubmitChangeProfile}
        />
      </div>
    </div>
  )
}