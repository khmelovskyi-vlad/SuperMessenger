import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import ChangeProfileForm from '../../../organisms/ChangeProfileForm';
// import "./Modal.css"


import styles from './style.module.css'

export default function ChangeProfileModal(props) {
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