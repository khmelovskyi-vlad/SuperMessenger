import React from 'react';
import Div from '../atoms/Div';
import Input from '../atoms/Input';
import SimpleContent from '../organisms/SimpleContent';
export default function MembersFoo(props) {
  return (
    <Div className="column row m-1 p-0 flex-column">
      {
        props.isCreator &&
        <Input className="column addMemberInput" type="button" defaultValue="add new member" onClick={props.onClickAddMember} />
      }
      {
        props.usersInGroup &&
        props.usersInGroup.map(userInGroup => 
          <SimpleContent
              id={props.groupId}
              key={userInGroup.id}
              simpleContentClasses="simpleGroupContent"
              imgContentClasses="simpleImgContent"
              imgClasses="simpleImg" 
              isUser={true}
              imageName={userInGroup.imageName}
              name={userInGroup.email}
          />
          )
      }
    </Div>
  );
}