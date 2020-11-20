import React from 'react';
import Div from '../atoms/Div';
import Input from '../atoms/Input';
import SimpleContent from '../molecules/SimpleContent';
export default function Members(props) {
  return (
    <Div className="column row m-1 p-0 flex-column">
      {
        props.isCreator &&
        <Input className="column addMemberInput" type="button" defaultValue="add new member" onClick={props.onClickAddMember} />
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
          <SimpleContent
              // selectedGroupOnClick={props.selectedGroupOnClick}
              id={props.groupId}
              key={userInGroup.id}
              simpleContentClasses="simpleGroupContent"
              imgContentClasses="simpleImgContent"
              imgClasses="simpleImg" 
              isUser={true}
              // simpleNameClasses="simpleName"
              imageId={userInGroup.imageId}
              name={userInGroup.email}
              // onClickAddMember={props.onClickAddMember}
          />
          )
      }
    </Div>
  );
}