import React from 'react';
import ConfirmationModal from '../../components/templates/Modals/ConfirmationModal';
import ConfirmationType from '../Enums/ConfirmationType';


export default function ConfirmationModalContainer(props) {
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
    <ConfirmationModal
      titleContent={getTitleContent()}
      wrapperRef={props.wrapperRef}
      confirmationType={props.confirmationType}
      onAcceptConfirmation={props.onAcceptConfirmation}
      onRejectConfirmation={props.onRejectConfirmation}
      onClickBackModal={props.onClickBackModal}
    />
  )
}