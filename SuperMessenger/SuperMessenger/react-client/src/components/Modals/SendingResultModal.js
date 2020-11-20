import React, { Fragment, useState } from 'react';
import Div from '../atoms/Div';
import Input from '../atoms/Input';
import Title from '../atoms/Title';
import "./Modal.css"
export default function SendingResultModal(props) {
  return (
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">{props.sendingResult}</Title>
        <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
        {/* <input className="modal-input" type="button" defaultValue="back" onClick={props.onClickBack} /> */}
        {/* <input className="modal-input" type="button" defaultValue="close" onClick={props.onClickClose} /> */}
        
        {/* <button className="modal-imput" onClick={props.onClickBack} value="back"></button>
        <button className="modal-imput" onClick={props.onClickClose} value="close"></button> */}
      </Div>
    </Div>
  )
}