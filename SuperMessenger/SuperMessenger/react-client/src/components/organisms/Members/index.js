import React from 'react';
import GroupType from '../../../containers/Enums/GroupType';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import SimpleContent from '../SimpleContent';

import styles from './style.module.css'

export default function Members(props) {
  const className = [props.className, styles[props.size], "column", "row", "p-0", "m-1", "flex-column"];
  return (
    <Div className={className.join(" ")}>
      {
        (props.isCreator || props.groupType === GroupType.public) &&
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
            isOwner={userInGroup.isCreator}
            showOwner={true}
          />
          )
      }
    </Div>
  );
}