import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import Span from '../../../atoms/Span';
import SimpleContent from '../../../organisms/SimpleContent';
import ConfirmationButton from '../../../molecules/ConfirmationButton';
// import "./Modal.css"


import styles from './style.module.css'

export default function AcceptInvitationModal(props) {
  return (
    <Div className="modal">
      <Div className="modal-bodyy m-0 row flex-column flex-nowrap" ref={props.wrapperRef}>
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
          id={props.selectedInvitation.simpleGroup.id}
          key={props.selectedInvitation.simpleGroup.id}
          simpleContentClasses="foo"
          imgContentClasses=""
          imgClasses="mw-100" 
          simpleNameClasses="simpleName"
          isUser={false}
          imageName={props.selectedInvitation.simpleGroup.imageName}
          name={props.selectedInvitation.simpleGroup.name}
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
      </Div>
    </Div>
  )
}