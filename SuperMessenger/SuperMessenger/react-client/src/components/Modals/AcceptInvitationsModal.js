import React from 'react';
import Div from '../atoms/Div';
import Input from '../atoms/Input';
import Span from '../atoms/Span';
import Title from '../atoms/Title';
import SimpleContent from '../molecules/SimpleContent';
import "./Modal.css"
export default function AcceptInvitationsModal(props) {
  return (
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">Accept invitations</Title>
        <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
        <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
          {
            props.myInvitations && props.myInvitations.map(invitation =>
              <SimpleContent
                // onClickSelectedGroup={props.onClickCloseModal}
                // onClickSelectedUser={props.onClickCloseModal}
                // user={user}
                invitation={invitation}
                onClickSelectInvitation={props.onClickOpenAcceptInvitation}
                id={invitation.simpleGroup.id}
                key={invitation.simpleGroup.id}
                simpleContentClasses="simpleGroupContent"
                imgContentClasses="simpleImgContent"
                imgClasses="simpleImg" 
                simpleNameClasses="simpleName"
                isUser={false}
                imageId={invitation.simpleGroup.imageId}
                name={invitation.simpleGroup.name}
                bottomData={<Span className="groupInfoMembersCount m-0 p-0">{invitation.inviter.email}</Span>}
              />)
          }
        </Div>
      </Div>
    </Div>
  )
}