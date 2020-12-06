import React from 'react';
import Div from '../../../atoms/Div';
import Input from '../../../atoms/Input';
import Title from '../../../atoms/Title';
// import "./Modal.css"


import styles from './style.module.css'

export default function SendingResultModal(props) {
  return (
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">{props.sendingResult}</Title>
        <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
      </Div>
    </Div>
  )
}