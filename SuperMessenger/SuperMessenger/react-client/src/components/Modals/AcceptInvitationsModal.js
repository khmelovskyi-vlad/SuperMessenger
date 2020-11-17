import React from 'react';
import GroupInfoMembersCount from '../Atoms/GroupInfoMembersCount';
import SimpleContent from '../Molecules/SimpleContent';
import "./Modal.css"
export default function AcceptInvitationsModal(props) {
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap">
        <h1 className="modal-title">Accept invitations</h1>
        <div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
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
                bottomData={<GroupInfoMembersCount value={invitation.inviter.email}/>}
              />)
          }
        </div>
      </div>
    </div>
  )
}