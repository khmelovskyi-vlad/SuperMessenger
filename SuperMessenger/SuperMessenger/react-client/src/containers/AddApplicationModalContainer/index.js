import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import useOutsideModal from '../../hooks/useOutsideModal';
import AddApplicationModal from '../../components/templates/Modals/AddApplicationModal';
import SearchGroupToApplicationModal from '../../components/templates/Modals/SearchGroupToApplicationModal';
import ApplicationModel from '../../Models/ApplicationModel';
import ModalType from '../../Entities/Enums/ModalType';
import { receiveNoMySearchedGroups } from '../../Api/Hendlers/GroupHandlers';
import { sendApplication } from '../../Api/Services/ApplicationServices';
import { searchNoMyGroups } from '../../Api/Services/GroupServices';



export default function AddApplicationModalContainer({
  connections,
  setRenderLoader,
  simpleMe,
  setRenderAddApplicationModalContainer,
  renderAddApplicationModalContainer,
}) {
  const [renderAddApplicationModal, setRenderAddApplicationModal] = useState(false);
  const [application, setApplication] = useState("");
  const [foundGroups, setFoundGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [wrapperRef, setOpenModals] = useOutsideModal(handleClickCloseModal);


  useEffect(() => {
    if (connections) {
      receiveNoMySearchedGroups(handleReceiveNoMySearchedGroups);
    }
  }, [connections]);

  function handleClickCloseModal(openModals) {
    if (openModals.length > 0) {
      const lastModel = openModals[openModals.length - 1];
      let cleanOpenModals = true;
      switch (lastModel) {
        case ModalType.addApplication:
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
  function handleReceiveNoMySearchedGroups(foundGroups) {
    setFoundGroups(foundGroups);
  }
  function handleClickBack() {
    if (renderAddApplicationModal) {
      setRenderAddApplicationModal(false);
    }
    else {
      clearData();
    }
  }
  
  function handleClickSelectedGroupId(selectedGroupId) {
    setOpenModals(prev => [...prev, ModalType.addApplication])
    setSelectedGroupId(selectedGroupId);
    setRenderAddApplicationModal(true);
  }

  function handleSubmitAddApplication(e, application) {
    setRenderLoader(true);
    clearData();
    sendApplication(application);
  }


  function handleChangeSearchNoMyGroups(e) {
		const debouncedSave = debounce(() => searchNoMyGroups(e.target.value), 1000);
		debouncedSave();
  }
  function handleChangeApplication(e) {
    setApplication(e.target.value);
  }
  function handleCreateApplication() {
    return new ApplicationModel(application, undefined, selectedGroupId, simpleMe);
  }
  function clearData() {
    setRenderAddApplicationModalContainer(false);
    setRenderAddApplicationModal(false);
    setFoundGroups([]);
  }

  return (
    <>
      {
        renderAddApplicationModalContainer ?
          renderAddApplicationModal ?
            <AddApplicationModal
              wrapperRef={wrapperRef}
              onClickBackModal={handleClickBack}
              onSubmitAddApplication={handleSubmitAddApplication}
              onCreateApplication={handleCreateApplication}
              onChangeApplication={handleChangeApplication}
            />
            :
            <SearchGroupToApplicationModal
              wrapperRef={wrapperRef}
              onClickBackModal={handleClickBack}
              foundGroups={foundGroups}
              onChangeSearchGroupToApplicationModal={handleChangeSearchNoMyGroups}
              onClickSelectedGroupId={handleClickSelectedGroupId}
            />
          :
          null
      } 
    </>
  )
}