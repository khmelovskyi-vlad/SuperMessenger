import React, { Fragment, useState } from 'react';
import GroupInfoMembersCount from '../Atoms/GroupInfoMembersCount';
import InvitationValue from '../Atoms/InvitationValue';
import NewMemberModalForm from '../Molecules/NewMemberModalForm';
import SimpleGroupContent from '../Molecules/SimpleGroupContent';
import ImgPaths from '../../ImgPaths';
import "./Modal.css"
export default function AcceptInvitationModal(props) {
  const imgPaths = new ImgPaths();
  // const path = props.isUser
  //   ? imgPaths.join(imgPaths.userAvatarsPath, props.imageId)
  //   : imgPaths.join(imgPaths.groupImgsPath, props.imageId);
  return (
    <div className="modal">
      <div className="modal-bodyy m-0 row flex-column flex-nowrap">
        <h1 className="modal-title">Accept invitation</h1>
        <SimpleGroupContent
          // onClickSelectedGroup={props.onClickCloseModal}
          onClickSelectedUser={props.onClickCloseModal}
          user={props.selectedInvitation.inviter}
          // invitation={invitation}
          // onClickSelectedInvitation={props.onClickOpenAcceptInvitation}
          groupId={props.selectedInvitation.inviter.id}
          key={props.selectedInvitation.inviter.id}
          groupContentClasses="simpleGroupContent"
          imgContentClasses="simpleImgContent"
          imgClasses="simpleImg" 
          // simpleNameClasses="simpleName"
          isUser={true}
          imageId={props.selectedInvitation.inviter.imageId}
          name={props.selectedInvitation.inviter.email}
          // bottomData={<GroupInfoMembersCount value={invitation.inviter.email}/>}
        />
        <SimpleGroupContent
          // onClickSelectedGroup={props.onClickCloseModal}
          onClickSelectedUser={props.onClickCloseModal}
          user={props.selectedInvitation.inviter}
          // invitation={invitation}
          // onClickSelectedInvitation={props.onClickOpenAcceptInvitation}
          groupId={props.selectedInvitation.simpleGroup.id}
          key={props.selectedInvitation.simpleGroup.id}
          groupContentClasses="foo"
          imgContentClasses=""
          imgClasses="mw-100" 
          simpleNameClasses="simpleName"
          isUser={false}
          imageId={props.selectedInvitation.simpleGroup.imageId}
          name={props.selectedInvitation.simpleGroup.name}
          bottomData={<InvitationValue value={props.selectedInvitation.value}/>}
        />
        <div className="column row m-0">
          <input className="modal-input col-6 p-0"
            type="button"
            defaultValue="accept"
            onClick={(e) => props.onClickAccept(e, props.selectedInvitation)} />
          <input className="modal-input col-6 p-0"
            type="button"
            defaultValue="decline accept"
            onClick={(e) => props.onClickDecline(e, props.selectedInvitation)} />
        </div>

        
      </div>
    </div>
    //selectedInvitation
  )
}