import React from 'react';
import SimpleContent from '../molecules/SimpleContent';
import ImgPaths from '../../ImgPaths';
import "./Modal.css"
import Div from '../atoms/Div';
import Input from '../atoms/Input';
import Title from '../atoms/Title';
import Span from '../atoms/Span';
export default function AcceptInvitationModal(props) {
  const imgPaths = new ImgPaths();
  // const path = props.isUser
  //   ? imgPaths.join(imgPaths.userAvatarsPath, props.imageId)
  //   : imgPaths.join(imgPaths.groupImgsPath, props.imageId);
  return (
    <Div className="modal">
      <Div className="modal-bodyy m-0 row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">Accept invitation</Title>
        <SimpleContent
          // onClickSelectedGroup={props.onClickCloseModal}
          onClickSelectUser={props.onClickCloseModal}
          user={props.selectedInvitation.inviter}
          // invitation={invitation}
          // onClickSelectedInvitation={props.onClickOpenAcceptInvitation}
          id={props.selectedInvitation.inviter.id}
          key={props.selectedInvitation.inviter.id}
          simpleContentClasses="simpleGroupContent"
          imgContentClasses="simpleImgContent"
          imgClasses="simpleImg" 
          // simpleNameClasses="simpleName"
          isUser={true}
          imageId={props.selectedInvitation.inviter.imageId}
          name={props.selectedInvitation.inviter.email}
          // bottomData={<GroupInfoMembersCount value={invitation.inviter.email}/>}
        />
        <SimpleContent
          // onClickSelectedGroup={props.onClickCloseModal}
          onClickSelectUser={props.onClickCloseModal}
          user={props.selectedInvitation.inviter}
          // invitation={invitation}
          // onClickSelectedInvitation={props.onClickOpenAcceptInvitation}
          id={props.selectedInvitation.simpleGroup.id}
          key={props.selectedInvitation.simpleGroup.id}
          simpleContentClasses="foo"
          imgContentClasses=""
          imgClasses="mw-100" 
          simpleNameClasses="simpleName"
          isUser={false}
          imageId={props.selectedInvitation.simpleGroup.imageId}
          name={props.selectedInvitation.simpleGroup.name}
          bottomData={<Span
            className="column m-0 p-0 text-wrap"
            style={{ wordBreak: "break-all" }}
          >
            {props.selectedInvitation.value}
          </Span>}
        />
        <Div className="column row m-0">
          <Input className="modal-input col-6 p-0"
            type="button"
            defaultValue="accept"
            onClick={(e) => props.onClickAccept(e, props.selectedInvitation)} />
          <Input className="modal-input col-6 p-0"
            type="button"
            defaultValue="decline accept"
            onClick={(e) => props.onClickDecline(e, props.selectedInvitation)} />
          <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
        </Div>

        
      </Div>
    </Div>
    //selectedInvitation
  )
}