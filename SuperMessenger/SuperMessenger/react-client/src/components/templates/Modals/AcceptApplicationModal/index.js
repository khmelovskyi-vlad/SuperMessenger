import React from 'react';
import Title from '../../../atoms/Title';
import Span from '../../../atoms/Span';
import SimpleContentContainer from '../../../../containers/SimpleContentContainer';
import ConfirmationButton from '../../../molecules/ConfirmationButton';
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import Modal from '../Modal';



export default function AcceptApplicationModal({
  wrapperRef,
  onClickCloseModal,
  selectedApplication,
  onClickAccept,
  onClickDecline,
  onClickBackModal,
}) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={wrapperRef}>
      <Title className="modal-title">Accept application</Title>
      <SimpleContentContainer
        onClickSelectUser={onClickCloseModal}
        user={selectedApplication.user}
        id={selectedApplication.user.id}
        key={selectedApplication.user.id}
        simpleContentClasses="foo"
        imgContentClasses=""
        imgClasses="mw-100" 
        simpleNameClasses="simpleName"
        isUser={true}
        imageName={selectedApplication.user.imageName}
        name={selectedApplication.user.email}
        bottomData=
        {<Span
          className="column m-0 p-0 text-wrap"
          style={{ wordBreak: "break-all" }}
        >
          {selectedApplication.value}
        </Span>}
      />
      <ConfirmationButton
        selectedItem={selectedApplication}
        onClickAccept={onClickAccept}
        onClickDecline={onClickDecline}
        onClickBackModal={onClickBackModal}
      />
    </Modal>
  )
}