import React, { useEffect, useState } from 'react';
import useOutsideModal from '../../hooks/useOutsideModal';
import AcceptInvitationModal from '../../components/templates/Modals/AcceptInvitationModal';
import AcceptInvitationsModal from '../../components/templates/Modals/AcceptInvitationsModal';
import ModalType from '../../Entities/Enums/ModalType';
import InvitationModel from '../../Models/InvitationModel';
import { acceptInvitation, declineInvitation } from '../../Api/Services/InvitationsServices';


export default function AcceptInvitationModalContainer({
  setSelectedInvitation,
  setRenderLoader,
  setRenderAcceptInvitationModalContainer,
  renderAcceptInvitationModalContainer,
  selectedInvitation,
  myInvitations,
}) {
  const [renderAcceptInvitationModal, setRenderAcceptInvitationModal] = useState(false);
  const [wrapperRef, setOpenModals] = useOutsideModal(handleClickCloseModal);

  useEffect(() => {
    if (selectedInvitation.group) {
      setRenderAcceptInvitationModal(true);
    }
    else {
      setRenderAcceptInvitationModal(false);
    }
  }, [selectedInvitation]);

  function handleClickCloseModal(openModals) {
    if (openModals.length > 0) {
      const lastModel = openModals[openModals.length - 1];
      let cleanOpenModals = true;
      switch (lastModel) {
        case ModalType.acceptInvitation:
          clearData();
          break;
        default:
          cleanOpenModals = false;
          break;
      }
      if (cleanOpenModals) {
        setOpenModals([]);
      }
    }
    else {
      clearData();
    }
  };

  function handleClickOpenAcceptInvitation(invitation) {
    setOpenModals(prev => [...prev, ModalType.acceptInvitation]);
    setSelectedInvitation(invitation);
  }
  function handleClickBack() {
    if (renderAcceptInvitationModal) {
      setSelectedInvitation(new InvitationModel());
    }
    else {
      clearData();
    }
  }

  function handleClickDeclineInvitation(e, invitation) {
    setRenderLoader(true);
    clearData();
    declineInvitation(invitation);
  }
  function handleClickAcceptInvitation(e, invitation) {
    setRenderLoader(true);
    clearData();
    acceptInvitation(invitation);
  }

  function clearData() {
    setRenderAcceptInvitationModalContainer(false);
    setSelectedInvitation(new InvitationModel());
  }

  return (
    <>
      {
        renderAcceptInvitationModalContainer ? 
          renderAcceptInvitationModal ? 
            <AcceptInvitationModal
              wrapperRef={wrapperRef}
              onClickBackModal={handleClickBack}
              selectedInvitation={selectedInvitation}
              onClickAccept={handleClickAcceptInvitation}
              onClickDecline={handleClickDeclineInvitation}
            />
            :
            <AcceptInvitationsModal
              wrapperRef={wrapperRef}
              onClickBackModal={handleClickBack}
              myInvitations={myInvitations}
              onClickOpenAcceptInvitation={handleClickOpenAcceptInvitation}
            />
          :
          null
      }
    </>
  )
}