import React from 'react';
import ConfirmationType from '../../../../containers/Enums/ConfirmationType';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import ConfirmationButton from '../../../molecules/ConfirmationButton';
import "../Modal.css"
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
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">{getTitleContent()}</Title>
        <ConfirmationButton
          selectedItem={props.confirmationType}
          onClickAccept={props.onAcceptConfirmation}
          onClickDecline={props.onRejectConfirmation}
          onClickBackModal={props.onClickBackModal}
        />
      </Div>
    </Div>
  )
}