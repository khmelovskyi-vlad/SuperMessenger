import React from 'react';
import ConfirmationType from '../../../../containers/Enums/ConfirmationType';
import Title from '../../../atoms/Title';
import ConfirmationButton from '../../../molecules/ConfirmationButton';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';


export default function ConfirmationModal(props) {
  function getTitleContent() {
    switch (props.confirmationType) {
      case ConfirmationType.leavingGroup:
        return "Do you really want to leave the group?";
      case ConfirmationType.removingGroup:
        return "Do you really want to remove the group?";
      default:
        return "";
    }
  }
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">{getTitleContent()}</Title>
      <ConfirmationButton
        selectedItem={props.confirmationType}
        onClickAccept={props.onAcceptConfirmation}
        onClickDecline={props.onRejectConfirmation}
        onClickBackModal={props.onClickBackModal}
      />
    </Modal>
  )
}