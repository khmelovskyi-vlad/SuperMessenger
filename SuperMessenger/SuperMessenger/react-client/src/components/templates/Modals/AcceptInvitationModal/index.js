import React from 'react';
import Title from '../../../atoms/Title';
import Span from '../../../atoms/Span';
import SimpleContent from '../../../organisms/SimpleContent';
import ConfirmationButton from '../../../molecules/ConfirmationButton';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';



export default function AcceptInvitationModal(props) {
  //m-0
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">Accept invitation</Title>
      <SimpleContent
        onClickSelectUser={props.onClickCloseModal}
        user={props.selectedInvitation.inviter}
        id={props.selectedInvitation.inviter.id}
        key={props.selectedInvitation.inviter.id}
        simpleContentClasses="simpleGroupContent"
        imgContentClasses="simpleImgContent"
        imgClasses="simpleImg" 
        isUser={true}
        imageName={props.selectedInvitation.inviter.imageName}
        name={props.selectedInvitation.inviter.email}
      />
      <SimpleContent
        onClickSelectUser={props.onClickCloseModal}
        user={props.selectedInvitation.inviter}
        id={props.selectedInvitation.group.id}
        key={props.selectedInvitation.group.id}
        simpleContentClasses="foo"
        imgContentClasses=""
        imgClasses="mw-100" 
        simpleNameClasses="simpleName"
        isUser={false}
        imageName={props.selectedInvitation.group.imageName}
        name={props.selectedInvitation.group.name}
        bottomData={<Span
          className="column m-0 p-0 text-wrap"
          style={{ wordBreak: "break-all" }}
        >
          {props.selectedInvitation.value}
        </Span>}
      />
      <ConfirmationButton
        selectedItem={props.selectedInvitation}
        onClickAccept={props.onClickAccept}
        onClickDecline={props.onClickDecline}
        onClickBackModal={props.onClickBackModal}
      />
    </Modal>
  )
}