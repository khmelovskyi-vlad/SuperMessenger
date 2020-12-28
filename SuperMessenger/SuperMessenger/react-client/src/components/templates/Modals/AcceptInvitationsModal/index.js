import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import Span from '../../../atoms/Span';
import Input from '../../../atoms/Input';
import SimpleContentContainer from '../../../../containers/SimpleContentContainer';
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import Modal from '../Modal';


export default function AcceptInvitationsModal({
  wrapperRef,
  onClickBackModal,
  myInvitations,
  onClickOpenAcceptInvitation,
}) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={wrapperRef}>
      <Title className="modal-title">Accept invitations</Title>
      <Input type="button" onClick={onClickBackModal} defaultValue="back"/>
      <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
        {
          myInvitations && myInvitations.map(invitation =>
            <SimpleContentContainer
              invitation={invitation}
              onClickSelectInvitation={onClickOpenAcceptInvitation}
              id={invitation.group.id}
              key={invitation.group.id}
              simpleContentClasses="simpleGroupContent"
              imgContentClasses="simpleImgContent"
              imgClasses="simpleImg" 
              simpleNameClasses="simpleName"
              isUser={false}
              imageName={invitation.group.imageName}
              name={invitation.group.name}
              bottomData={<Span className="groupInfoMembersCount m-0 p-0">{invitation.inviter.email}</Span>}
            />)
        }
      </Div>
    </Modal>
  )
}