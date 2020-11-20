import React from 'react';
import SimpleImgContent from '../molecules/SimpleImgContent';
import Div from '../atoms/Div';
import Span from '../atoms/Span';
import Img from '../atoms/Img';
import ImgPaths from '../../ImgPaths';
export default function InvitationContentFoo(props) {
  const classList = ["column", "row", "m-1", "p-0", props.invitationClasses];
  const imgPaths = new ImgPaths();
  const path = props.isUser
    ? imgPaths.join(imgPaths.userAvatarsPath, props.imageId)
    : imgPaths.join(imgPaths.groupImgsPath, props.imageId);
  return (
    <Div className={classList.join(" ")}
      onClick={props.selectedGroupOnClick ? () => props.selectedGroupOnClick(props.groupId) :
      props.selectedUserOnClick ? () => props.selectedUserOnClick(props.user) : null}
    >
      {/* <SimpleGroupImgContent imageId={props.group.imageId }/> */}
      <Div className={`align-items-center justify-content-center d-flex m-0 p-0 col-3 ${props.imgContentClasses}`}>
        <Img src={`${path}.jpg`} alt="image" className={props.imgClasses}/>
      </Div>
      {/* <SimpleImgContent
        classes={props.imgContentClasses}
        imgClasses={props.imgClasses}
        imageId={props.imageId}
        isUser={props.isUser}
      /> */}
      <Div className="m-0 p-0 col-1">
      </Div>
      <Div className="col-8 p-0 row flex-column m-0">
        <Span className={`${props.simpleNameClasses} column m-0`}>{props.name}</Span>
        {props.bottomData}
        {/* <LastMessageContent lastMessage={props.group.lastMessage}/> */}
      </Div>
    </Div>
  );
}