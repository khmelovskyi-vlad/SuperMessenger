import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import Span from '../../../atoms/Span';
import Input from '../../../atoms/Input';
import SimpleContent from '../../../organisms/SimpleContent';
// import "./Modal.css"


import styles from './style.module.css'

export default function AcceptApplicationsModal(props) {
  return (
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">Accept applications</Title>
        <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
        <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
          {
            props.myApplications && props.myApplications.map(application =>
              <SimpleContent
                application={application}
                onClickSelectApplication={props.onClickOpenAcceptApplication}
                id={application.groupId}
                key={application.user.id}
                simpleContentClasses="simpleGroupContent"
                imgContentClasses="simpleImgContent"
                imgClasses="simpleImg" 
                simpleNameClasses="simpleName"
                // user={application.user}
                isUser={true}
                imageId={application.user.imageId}
                name={application.user.email}
                bottomData={<Span className="groupInfoMembersCount m-0 p-0">{application.user.email}</Span>}
              />)
          }
        </Div>
      </Div>
    </Div>
  )
}