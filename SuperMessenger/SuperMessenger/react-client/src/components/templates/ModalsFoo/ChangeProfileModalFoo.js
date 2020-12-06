import React, {useState} from 'react'
import Invitation from '../../containers/Models/Invitation';
import InvitationModel from '../../containers/Models/InvitationModel';
import Div from '../atoms/Div';
import Title from '../atoms/Title';
import ChangeProfileForm from '../organisms/ChangeProfileForm';
import CreateGroupForm from '../organisms/CreateGroupForm'
import SimpleContent from '../organisms/SimpleContent';
import "./Modal.css"
export default function ChangeProfileModalFoo(props) {
  return (
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">Change profile</Title>
        <ChangeProfileForm
          onClickBackModal={props.onClickBackModal}
          onSubmitChangeProfile={props.onSubmitChangeProfile}
        />
      </Div>
    </Div>
  )
}