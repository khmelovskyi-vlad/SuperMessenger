import React from 'react';
import Input from '../../../atoms/Input';
import Title from '../../../atoms/Title';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';
import "../Modal.css"



export default function SendingResultModal(props) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">{props.sendingResult}</Title>
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
    </Modal>
  )
}