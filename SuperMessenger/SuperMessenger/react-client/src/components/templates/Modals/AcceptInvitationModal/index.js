import React from 'react';
import Title from '../../../atoms/Title';
import Span from '../../../atoms/Span';
import SimpleContentContainer from '../../../../containers/SimpleContentContainer';
import ConfirmationButton from '../../../molecules/ConfirmationButton';
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import Modal from '../Modal';



export default function AcceptInvitationModal({
  wrapperRef,
  onClickCloseModal,
  selectedInvitation,
  onClickAccept,
  onClickDecline,
  onClickBackModal,
}) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={wrapperRef}>
      <Title className="modal-title">Accept invitation</Title>
      <SimpleContentContainer
        onClickSelectUser={onClickCloseModal}
        user={selectedInvitation.inviter}
        id={selectedInvitation.inviter.id}
        key={selectedInvitation.inviter.id}
        simpleContentClasses="simpleGroupContent"
        imgContentClasses="simpleImgContent"
        imgClasses="simpleImg" 
        isUser={true}
        imageName={selectedInvitation.inviter.imageName}
        name={selectedInvitation.inviter.email}
      />
      <SimpleContentContainer
        onClickSelectUser={onClickCloseModal}
        user={selectedInvitation.inviter}
        id={selectedInvitation.group.id}
        key={selectedInvitation.group.id}
        simpleContentClasses="foo"
        imgContentClasses=""
        imgClasses="mw-100" 
        simpleNameClasses="simpleName"
        isUser={false}
        imageName={selectedInvitation.group.imageName}
        name={selectedInvitation.group.name}
        bottomData={<Span
          className="column m-0 p-0 text-wrap"
          style={{ wordBreak: "break-all" }}
        >
          {selectedInvitation.value}
        </Span>}
      />
      <ConfirmationButton
        selectedItem={selectedInvitation}
        onClickAccept={onClickAccept}
        onClickDecline={onClickDecline}
        onClickBackModal={onClickBackModal}
      />
    </Modal>
  )
}