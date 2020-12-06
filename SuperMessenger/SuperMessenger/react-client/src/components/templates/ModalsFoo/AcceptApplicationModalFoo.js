import React from 'react';
import SimpleContent from '../organisms/SimpleContent';
import ImgPaths from '../../ImgPaths';
import "./Modal.css"
import Div from '../atoms/Div';
import Input from '../atoms/Input';
import Title from '../atoms/Title';
import Span from '../atoms/Span';
import ConfirmationButton from '../molecules/ConfirmationButton';
export default function AcceptApplicationModalFoo(props) {
  const imgPaths = new ImgPaths();
  // const path = props.isUser
  //   ? imgPaths.join(imgPaths.userAvatarsPath, props.imageId)
  //   : imgPaths.join(imgPaths.groupImgsPath, props.imageId);
  return (
    <Div className="modal">
      <Div className="modal-bodyy m-0 row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">Accept application</Title>
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
        {/* <Div className="column row m-0">
          <Input className="modal-input col-6 p-0"
            type="button"
            defaultValue="accept"
            onClick={(e) => props.onClickAccept(e, props.selectedApplication)} />
          <Input className="modal-input col-6 p-0"
            type="button"
            defaultValue="decline accept"
            onClick={(e) => props.onClickDecline(e, props.selectedApplication)} />
          <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
        </Div> */}

        
      </Div>
    </Div>
    //selectedInvitation
  )
}