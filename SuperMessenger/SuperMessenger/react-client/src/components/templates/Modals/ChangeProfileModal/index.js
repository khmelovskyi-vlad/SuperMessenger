import React from 'react';
import Title from '../../../atoms/Title';
import ChangeProfileForm from '../../../organisms/ChangeProfileForm';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';


export default function ChangeProfileModal(props) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">Change profile</Title>
      <ChangeProfileForm
        onClickBackModal={props.onClickBackModal}
        onSubmitChangeProfile={props.onSubmitChangeProfile}
      />
    </Modal>
  )
}