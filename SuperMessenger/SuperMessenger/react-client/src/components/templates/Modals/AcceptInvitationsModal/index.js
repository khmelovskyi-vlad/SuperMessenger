import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import Span from '../../../atoms/Span';
import Input from '../../../atoms/Input';
import SimpleContent from '../../../organisms/SimpleContent';
// import "./Modal.css"


import styles from './style.module.css'

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
                imageName={invitation.simpleGroup.imageName}
                name={invitation.simpleGroup.name}
                bottomData={<Span className="groupInfoMembersCount m-0 p-0">{invitation.inviter.email}</Span>}
              />)
          }
        </Div>
      </Div>
    </Div>
  )
}