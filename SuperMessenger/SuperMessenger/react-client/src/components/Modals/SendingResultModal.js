import React, { Fragment, useState } from 'react';
import AddInvitationModalForm from '../Molecules/AddInvitationModalForm';
import "./Modal.css"
export default function SendingResultModal(props) {
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <h1 className="modal-title">{props.sendingResult}</h1>
        <input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
        {/* <input className="modal-input" type="button" defaultValue="back" onClick={props.onClickBack} /> */}
        {/* <input className="modal-input" type="button" defaultValue="close" onClick={props.onClickClose} /> */}
        
        {/* <button className="modal-imput" onClick={props.onClickBack} value="back"></button>
        <button className="modal-imput" onClick={props.onClickClose} value="close"></button> */}
      </div>
    </div>
  )
}