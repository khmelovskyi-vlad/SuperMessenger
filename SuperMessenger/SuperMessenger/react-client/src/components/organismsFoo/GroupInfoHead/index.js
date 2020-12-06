import React from 'react';
import SimpleImgContent from '../../molecules/SimpleImgContent';
import Div from '../../atoms/Div';
import Span from '../../atoms/Span';

import styles from './style.module.css'

export default function GroupInfoHead(props) {
  return (
    <div></div>
    // <Div className="column groupInfoContent row m-1 p-0">
    //   <SimpleImgContent imgClasses="groupInfoImg" classes="groupInfoContent" imageId={props.group.imageId} />
    //   {/* <GroupInfoImgContent imgClasses={"groupInfoImg"} imageId={props.group.imageId}/> */}
    //   <Div className="m-0 p-0 col-1">
    //   </Div>
    //   <Div  className="col-8 p-0 row flex-column m-0">
    //     <Span className="groupInfoName column m-0">{props.group.name}</Span>
    //     {/* <GroupInfoName value={props.group.name}/> */}
    //     <Span className="groupInfoMembersCount m-0 p-0">{props.group.usersInGroup.length}</Span>
    //   </Div>
    // </Div>
  );
}