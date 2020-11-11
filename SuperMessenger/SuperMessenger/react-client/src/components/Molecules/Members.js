import React from 'react';
import SimpleImg from '../Atoms/SimpleImg';
import SimpleName from '../Atoms/SimpleName';
import SimpleGroupContent from './SimpleGroupContent';
import SimpleImgContent from './SimpleImgContent';
export default function Members(props) {
  return (
    <div className="column row m-1 p-0 flex-column">
      {
        props.isCreator &&
        <input className="column addMemberInput" type="button" defaultValue="add new member" onClick={props.onClickAddMember} />
      }
      {/* <div className="column simpleGroupContent row m-1 p-0">
        <SimpleImgContent imgClasses={"simpleImg"} imageId={props.imageId}/>
        <div className="col-8 p-0 row flex-column m-0">
          <SimpleName value={props.groupName} classes="simpleName"/>
        </div>
      </div> */}
      {
        props.usersInGroup &&
        props.usersInGroup.map(userInGroup => 
          <SimpleGroupContent
              // selectedGroupOnClick={props.selectedGroupOnClick}
              groupId={props.groupId}
              key={userInGroup.id}
              groupContentClasses="simpleGroupContent"
              imgContentClasses="simpleImgContent"
              imgClasses="simpleImg" 
              isUser={true}
              // simpleNameClasses="simpleName"
              imageId={userInGroup.imageId}
              name={userInGroup.email}
              onClickAddMember={props.onClickAddMember}
              // bottomData={<LastMesssageContent lastMesssage={group.lastMesssage}/>}
          />
          )
      }
    </div>
  );
}