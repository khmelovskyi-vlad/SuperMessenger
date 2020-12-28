import React from 'react';
import useOutsideModal from '../../hooks/useOutsideModal';
import ConfirmationModal from '../../components/templates/Modals/ConfirmationModal';
import ConfirmationType from '../../Entities/Enums/ConfirmationType';


export default function ConfirmationModalContainer({
  setRenderConfirmationModalContainer,
  confirmationType,
  onLeaveGroup,
  onRemoveGroup,
  renderConfirmationModalContainer,
}) {
  const [wrapperRef, setOpenModals] = useOutsideModal(handleClickCloseModal);
  function handleClickCloseModal(openModals) {
    setRenderConfirmationModalContainer();
  };

  function getTitleContent() {
    switch (confirmationType) {
      case ConfirmationType.leavingGroup:
        return "Do you really want to leave the group?";
      case ConfirmationType.removingGroup:
        return "Do you really want to remove the group?";
      default:
        return "";
    }
  }
  function handleAcceptConfirmation(e, confirmationType) {
    switch (confirmationType) {
      case ConfirmationType.leavingGroup:
        onLeaveGroup();
        break;
      case ConfirmationType.removingGroup:
        onRemoveGroup();
        break;
      default:
        break;
    }
  }
  function handleRejectConfirmation(e, confirmationType) {
    switch (confirmationType) {
      case ConfirmationType.leavingGroup:
        setRenderConfirmationModalContainer();
        break;
      case ConfirmationType.removingGroup:
        setRenderConfirmationModalContainer();
        break;
      default:
        break;
    }
  }
  return (
    <>
      {
        renderConfirmationModalContainer &&
          <ConfirmationModal
            titleContent={getTitleContent()}
            wrapperRef={wrapperRef}
            confirmationType={confirmationType}
            onAcceptConfirmation={handleAcceptConfirmation}
            onRejectConfirmation={handleRejectConfirmation}
          />
      }
    </>
  )
}