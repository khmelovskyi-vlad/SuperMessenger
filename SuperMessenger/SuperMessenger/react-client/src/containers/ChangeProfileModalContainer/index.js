import React from 'react';
import useOutsideModal from '../../hooks/useOutsideModal';
import ChangeProfileModal from '../../components/templates/Modals/ChangeProfileModal';
import NewProfileModel from '../../Models/NewProfileModel';
import { changeProfile } from '../../Api/Services/SuperMessengerServices';
import { putProfile } from '../../Api//FileApi';



export default function ChangeProfileModalContainer({
  setRenderLoader,
  setRenderChangeProfileModalContainer,
  renderChangeProfileModalContainer,
}) {
  const [wrapperRef, setOpenModals] = useOutsideModal(handleClickCloseModal);

  function handleClickCloseModal(openModals) {
    clearData();
  };
  function handleSubmitChangeProfile(event, myFirstName, myLastName, avatar) {
    const haveNewAvatar = avatar !== null && avatar !== undefined;
    if (haveNewAvatar || myFirstName.length !== 0 || myLastName.length !== 0) {
      setRenderLoader(true);
      clearData();
      const newProfileModel = new NewProfileModel(myFirstName, myLastName);
      if (haveNewAvatar) {
        newProfileModel.haveImage = true;
        const formData = new FormData();
        formData.append("avatar", avatar);
        putProfile(formData, newProfileModel, changeProfile);
      }
      else {
        newProfileModel.haveImage = false;
        changeProfile(newProfileModel);
      }
    }
    event.preventDefault();
  }
  function handleClickBackModal() {
    clearData();
  }

  function clearData() {
    setRenderChangeProfileModalContainer(false);
  }

  return (
    <>
      {
        renderChangeProfileModalContainer &&
        <ChangeProfileModal
          wrapperRef={wrapperRef}
          onClickBackModal={handleClickBackModal}
          onSubmitChangeProfile={handleSubmitChangeProfile}
        />
      }
    </>
  )
}