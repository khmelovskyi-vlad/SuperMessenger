import React from 'react';
import GroupInfoMembersCount from '../Atoms/GroupInfoMembersCount';
import SimpleContent from '../Molecules/SimpleContent';
import "./Modal.css"
export default function AcceptApplicationsModal(props) {
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap">
        <h1 className="modal-title">Accept applications</h1>
        <div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
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
                bottomData={<GroupInfoMembersCount value={application.user.email}/>}
              />)
          }
        </div>
      </div>
    </div>
  )
}