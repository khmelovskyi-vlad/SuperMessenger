import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import Span from '../../../atoms/Span';
import Input from '../../../atoms/Input';
import SimpleContent from '../../../organisms/SimpleContent';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';


export default function AcceptApplicationsModal(props) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
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
              isUser={true}
              imageName={application.user.imageName}
              name={application.user.email}
              bottomData={<Span className="groupInfoMembersCount m-0 p-0">{application.user.email}</Span>}
            />)
        }
      </Div>
    </Modal>
  )
}