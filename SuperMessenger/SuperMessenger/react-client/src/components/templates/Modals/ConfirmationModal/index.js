import React from 'react';
import Title from '../../../atoms/Title';
import ConfirmationButton from '../../../molecules/ConfirmationButton';
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import Modal from '../Modal';


export default function ConfirmationModal({
  wrapperRef,
  titleContent,
  confirmationType,
  onAcceptConfirmation,
  onRejectConfirmation,
}) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={wrapperRef}>
      <Title className="modal-title">{titleContent}</Title>
      <ConfirmationButton
        selectedItem={confirmationType}
        onClickAccept={onAcceptConfirmation}
        onClickDecline={onRejectConfirmation}
      />
    </Modal>
  )
}