import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import Span from '../../../atoms/Span';
import Input from '../../../atoms/Input';
import SimpleContent from '../../../organisms/SimpleContent';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';


export default function AcceptInvitationsModal(props) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">Accept invitations</Title>
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
      <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
        {
          props.myInvitations && props.myInvitations.map(invitation =>
            <SimpleContent
              invitation={invitation}
              onClickSelectInvitation={props.onClickOpenAcceptInvitation}
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