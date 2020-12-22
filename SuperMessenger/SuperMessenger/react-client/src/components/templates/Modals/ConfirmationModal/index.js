import React from 'react';
import Title from '../../../atoms/Title';
import ConfirmationButton from '../../../molecules/ConfirmationButton';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';


export default function ConfirmationModal(props) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">{props.titleContent}</Title>
      <ConfirmationButton
        selectedItem={props.confirmationType}
        onClickAccept={props.onAcceptConfirmation}
        onClickDecline={props.onRejectConfirmation}
        onClickBackModal={props.onClickBackModal}
      />
    </Modal>
  )
}