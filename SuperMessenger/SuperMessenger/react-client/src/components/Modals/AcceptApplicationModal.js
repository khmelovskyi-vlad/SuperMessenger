import React, { Fragment, useState } from 'react';
import GroupInfoMembersCount from '../Atoms/GroupInfoMembersCount';
import InvitationValue from '../Atoms/InvitationValue';
import NewMemberModalForm from '../Molecules/NewMemberModalForm';
import SimpleContent from '../Molecules/SimpleContent';
import ImgPaths from '../../ImgPaths';
import "./Modal.css"
export default function AcceptApplicationModal(props) {
  const imgPaths = new ImgPaths();
  // const path = props.isUser
  //   ? imgPaths.join(imgPaths.userAvatarsPath, props.imageId)
  //   : imgPaths.join(imgPaths.groupImgsPath, props.imageId);
  return (
    <div className="modal">
      <div className="modal-bodyy m-0 row flex-column flex-nowrap">
        <h1 className="modal-title">Accept application</h1>
        {/* <SimpleGroupContent
          // onClickSelectedGroup={props.onClickCloseModal}
          onClickSelectedUser={props.onClickCloseModal}
          user={props.selectedApplication.user}
          // invitation={invitation}
          // onClickSelectedInvitation={props.onClickOpenAcceptInvitation}
          groupId={props.selectedApplication.user.id}
          key={props.selectedApplication.user.id}
          groupContentClasses="simpleGroupContent"
          imgContentClasses="simpleImgContent"
          imgClasses="simpleImg" 
          // simpleNameClasses="simpleName"
          isUser={true}
          imageId={props.selectedApplication.user.imageId}
          name={props.selectedApplication.user.email}
          // bottomData={<GroupInfoMembersCount value={invitation.inviter.email}/>}
        /> */}
        <SimpleContent
          // onClickSelectedGroup={props.onClickCloseModal}
          onClickSelectUser={props.onClickCloseModal}
          user={props.selectedApplication.user}
          // invitation={invitation}
          // onClickSelectedInvitation={props.onClickOpenAcceptInvitation}
          id={props.selectedApplication.user.id}
          key={props.selectedApplication.user.id}
          simpleContentClasses="foo"
          imgContentClasses=""
          imgClasses="mw-100" 
          simpleNameClasses="simpleName"
          isUser={true}
          imageId={props.selectedApplication.user.imageId}
          name={props.selectedApplication.user.email}
          bottomData={<InvitationValue value={props.selectedApplication.value}/>}
        />
        <div className="column row m-0">
          <input className="modal-input col-6 p-0"
            type="button"
            defaultValue="accept"
            onClick={(e) => props.onClickAccept(e, props.selectedApplication)} />
          <input className="modal-input col-6 p-0"
            type="button"
            defaultValue="decline accept"
            onClick={(e) => props.onClickDecline(e, props.selectedApplication)} />
        </div>

        
      </div>
    </div>
    //selectedInvitation
  )
}