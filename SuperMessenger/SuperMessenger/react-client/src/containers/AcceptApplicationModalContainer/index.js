import React, { useEffect, useState } from 'react';
import useOutsideModal from '../../hooks/useOutsideModal';
import AcceptApplicationModal from '../../components/templates/Modals/AcceptApplicationModal';
import AcceptApplicationsModal from '../../components/templates/Modals/AcceptApplicationsModal';
import ModalType from '../../Entities/Enums/ModalType';
import ApplicationModel from '../../Models/ApplicationModel';
import { acceptApplication, rejectApplication } from '../../Api/Services/ApplicationServices';


export default function AcceptApplicationModalContainer({
  setSelectedApplication,
  setRenderLoader,
  setRenderAcceptApplicationModalContainer,
  renderAcceptApplicationModalContainer,
  selectedApplication,
  groupApplications,
}) {
  const [renderAcceptApplicationModal, setRenderAcceptApplicationModal] = useState(false);
  const [wrapperRef, setOpenModals] = useOutsideModal(handleClickCloseModal);

  useEffect(() => {
    if (selectedApplication.groupId) {
      setRenderAcceptApplicationModal(true);
    }
    else {
      setRenderAcceptApplicationModal(false);
    }
  }, [selectedApplication]);

  function handleClickCloseModal(openModals) {
    if (openModals.length > 0) {
      const lastModel = openModals[openModals.length - 1];
      let cleanOpenModals = true;
      switch (lastModel) {
        case ModalType.acceptApplication:
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

  function handleClickOpenAcceptApplication(application) {
    setOpenModals(prev => [...prev, ModalType.acceptApplication])
    setSelectedApplication(application);
  }
  function handleClickBack() {
    if (renderAcceptApplicationModal) {
      setSelectedApplication(new ApplicationModel());
    }
    else {
      clearData();
    }
  }

  function handleClickDeclineApplication(e, application) {
    setRenderLoader(true);
    clearData();
    rejectApplication(application);
  }
  function handleClickAcceptApplication(e, application) {
    setRenderLoader(true);
    clearData();
    acceptApplication(application);
  }
  function clearData() {
    setRenderAcceptApplicationModalContainer(false);
    setSelectedApplication(new ApplicationModel());
  }

  return (
    <>
      {
        renderAcceptApplicationModalContainer ?
          renderAcceptApplicationModal ? 
            <AcceptApplicationModal
              wrapperRef={wrapperRef}
              onClickBackModal={handleClickBack}
              selectedApplication={selectedApplication}
              onClickAccept={handleClickAcceptApplication}
              onClickDecline={handleClickDeclineApplication}
            />
            :
            <AcceptApplicationsModal
              wrapperRef={wrapperRef}
              onClickBackModal={handleClickBack}
              groupApplications={groupApplications}
              onClickOpenAcceptApplication={handleClickOpenAcceptApplication}
            />
          :
          null
      }
    </>
  )
}