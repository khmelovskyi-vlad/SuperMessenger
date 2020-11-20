import React from 'react';
import SimpleImgContent from '../molecules/SimpleImgContent';
import Div from '../atoms/Div';
import Span from '../atoms/Span';
import ImgPaths from '../../ImgPaths';
import Img from '../atoms/Img';
export default function SimpleContentFoo(props) {
  const imgPaths = new ImgPaths();
  const path = props.isUser
    ? imgPaths.join(imgPaths.userAvatarsPath, props.imageId)
    : imgPaths.join(imgPaths.groupImgsPath, props.imageId);
  const classList = ["column", "row", "m-1", "p-0", props.simpleContentClasses];
  return (
    <Div className={classList.join(" ")}
      onClick={props.onClickSelectId ? () => props.onClickSelectId(props.id) :
      props.onClickSelectUser ? () => props.onClickSelectUser(props.user) :
      props.onClickSelectInvitation ? () => props.onClickSelectInvitation(props.invitation) :
      props.onClickSelectApplication ? () => props.onClickSelectApplication(props.application) : null}
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