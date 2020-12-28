import React from 'react';
import Title from '../../../atoms/Title';
import ChangeProfileFormContainer from '../../../../containers/ChangeProfileFormContainer';
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import Modal from '../Modal';


export default function ChangeProfileModal({
  wrapperRef,
  onClickBackModal,
  onSubmitChangeProfile,
}) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={wrapperRef}>
      <Title className="modal-title">Change profile</Title>
      <ChangeProfileFormContainer
        onClickBackModal={onClickBackModal}
        onSubmitChangeProfile={onSubmitChangeProfile}
      />
    </Modal>
  )
}