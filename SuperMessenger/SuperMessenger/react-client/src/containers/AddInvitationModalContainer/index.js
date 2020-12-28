import React, {useEffect, useState} from 'react';
import useOutsideModal from '../../hooks/useOutsideModal';
import AddInvitationModal from '../../components/templates/Modals/AddInvitationModal';
import NewMemberModal from '../../components/templates/Modals/NewMemberModal';
import ModalType from '../../Entities/Enums/ModalType';
import InvitationModel from '../../Models/InvitationModel';
import SimpleUserModel from '../../Models/SimpleUserModel';
import { sendInvitation } from '../../Api/Services/InvitationsServices';
import { searchNoInvitedUsers } from '../../Api/Services/SuperMessengerServices';


export default function AddInvitationModalContainer({
  simpleGroup,
  simpleMe,
  setRenderLoader,
  setRenderAddInvitationModalContainer,
  renderAddInvitationModalContainer,
  foundUsers,
  setFoundUsers,
}) {
  const [renderAddInvitationModal, setRenderAddInvitationModal] = useState(false);
  const [invitation, setInvitation] = useState("");
  const [selectedUser, setSelectedUser] = useState(new SimpleUserModel());
  const [wrapperRef, setOpenModals] = useOutsideModal(handleClickCloseModal);


  function handleClickCloseModal(openModals) {
    if (openModals.length > 0) {
      const lastModel = openModals[openModals.length - 1];
      let cleanOpenModals = true;
      switch (lastModel) {
        case ModalType.addInvitation:
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

  
  function handleClickBack() {
    if (renderAddInvitationModal) {
      setRenderAddInvitationModal(false);
    }
    else {
      clearData();
    }
  }
  function handleChangeInvitation(e) {
    setInvitation(e.target.value);
  }
  function handleCreateInvitation() {
    return new InvitationModel(invitation, undefined, simpleGroup, selectedUser, simpleMe);
  }
  function handleChangeSearchNoInvitedUsers(e) {
    searchNoInvitedUsers(e.target.value, simpleGroup.id);
  }
  function handleClickSelectedUser(selectedUser) {
    setOpenModals(prev => [...prev, ModalType.addInvitation])
    setSelectedUser(selectedUser);
    setRenderAddInvitationModal(true);
  }
  function handleSubmitAddInvitation(e, invitation) {
    setRenderLoader(true);
    clearData();
    sendInvitation(invitation);
  }
  function clearData() {
    setRenderAddInvitationModalContainer(false);
    setRenderAddInvitationModal(false);
    setFoundUsers([]);
  }
  
  return (
    <>
      {
        renderAddInvitationModalContainer ?
          renderAddInvitationModal ?
            <AddInvitationModal
              wrapperRef={wrapperRef}
              onClickBackModal={handleClickBack}
              onSubmitAddInvitation={handleSubmitAddInvitation}
              onChangeInvitation={handleChangeInvitation}
              onCreateInvitation={handleCreateInvitation}
            />
            :
            <NewMemberModal
              wrapperRef={wrapperRef}
              onClickBackModal={handleClickBack}
              foundUsers={foundUsers}
              onChangeSearchNoInvitedUsers={handleChangeSearchNoInvitedUsers}
              onClickSelectedUser={handleClickSelectedUser}
            />
          :
          null
      }
    </>
  )
}