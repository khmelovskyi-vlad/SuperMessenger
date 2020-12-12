import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import Span from '../../../atoms/Span';
import SimpleContent from '../../../organisms/SimpleContent';
import ConfirmationButton from '../../../molecules/ConfirmationButton';
// import "./Modal.css"


import styles from './style.module.css'

export default function AcceptApplicationModal(props) {
  
  return (
    <Div className="modal">
      <Div className="modal-bodyy m-0 row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">Accept application</Title>
        <SimpleContent
          onClickSelectUser={props.onClickCloseModal}
          user={props.selectedApplication.user}
          id={props.selectedApplication.user.id}
          key={props.selectedApplication.user.id}
          simpleContentClasses="foo"
          imgContentClasses=""
          imgClasses="mw-100" 
          simpleNameClasses="simpleName"
          isUser={true}
          imageName={props.selectedApplication.user.imageName}
          name={props.selectedApplication.user.email}
          bottomData={<Span
            className="column m-0 p-0 text-wrap"
            style={{ wordBreak: "break-all" }}
          >
            {props.selectedApplication.value}
          </Span>}
        />
        <ConfirmationButton
          selectedItem={props.selectedApplication}
          onClickAccept={props.onClickAccept}
          onClickDecline={props.onClickDecline}
          onClickBackModal={props.onClickBackModal}
        />
      </Div>
    </Div>
  )
}