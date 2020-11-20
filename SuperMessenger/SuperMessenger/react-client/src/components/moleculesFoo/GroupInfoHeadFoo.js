import React from 'react';
import SimpleImgContent from '../molecules/SimpleImgContent';
import Div from '../atoms/Div';
import Span from '../atoms/Span';
import ImgPaths from '../../ImgPaths';
import Img from '../atoms/Img';
export default function GroupInfoHeadFoo(props) {
  const imgPaths = new ImgPaths();
  const path = props.isUser
    ? imgPaths.join(imgPaths.userAvatarsPath, props.group.imageId)
    : imgPaths.join(imgPaths.groupImgsPath, props.group.imageId);
  return (
    <Div className="column groupInfoContent row m-1 p-0">
      <Div className="align-items-center justify-content-center d-flex m-0 p-0 col-3 groupInfoContent">
        <Img src={`${path}.jpg`} alt="image" className="groupInfoImg"/>
      </Div>
      {/* <SimpleImgContent imgClasses="groupInfoImg" classes="groupInfoContent" imageId={props.group.imageId} /> */}
      {/* <GroupInfoImgContent imgClasses={"groupInfoImg"} imageId={props.group.imageId}/> */}
      <Div className="m-0 p-0 col-1">
      </Div>
      <Div  className="col-8 p-0 row flex-column m-0">
        <Span className="groupInfoName column m-0">{props.group.name}</Span>
        {/* <GroupInfoName value={props.group.name}/> */}
        <Span className="groupInfoMembersCount m-0 p-0">{props.group.usersInGroup.length}</Span>
      </Div>
    </Div>
  );
}