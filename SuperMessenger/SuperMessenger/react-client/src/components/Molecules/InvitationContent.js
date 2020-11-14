import React from 'react';
import SimpleName from '../Atoms/SimpleName';
import LastMessageContent from './LastMessageContent';
import SimpleImgContent from './SimpleImgContent';
import SimpleImg from '../Atoms/SimpleImg';
export default function InvitationContent(props) {
  const classList = ["column", "row", "m-1", "p-0", props.invitationClasses];
  return (
    <div className={classList.join(" ")}
      onClick={props.selectedGroupOnClick ? () => props.selectedGroupOnClick(props.groupId) :
      props.selectedUserOnClick ? () => props.selectedUserOnClick(props.user) : null}
    >
      {/* <SimpleGroupImgContent imageId={props.group.imageId }/> */}
      <SimpleImgContent
        classes={props.imgContentClasses}
        imgClasses={props.imgClasses}
        imageId={props.imageId}
        isUser={props.isUser}
      />
      <div className="m-0 p-0 col-1">
      </div>
      <div className="col-8 p-0 row flex-column m-0">
        <SimpleName value={props.name} classes={props.simpleNameClasses} />
        {props.bottomData}
        {/* <LastMessageContent lastMessage={props.group.lastMessage}/> */}
      </div>
    </div>
  );
}