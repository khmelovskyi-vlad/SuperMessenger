import React from 'react';
import GroupType from '../../../Entities/Enums/GroupType';
import SimpleContentContainer from '../../../containers/SimpleContentContainer';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';

import styles from './style.module.css'

export default function Members({
  className,
  size,
  isCreator,
  groupType,
  onClickAddMember,
  usersInGroup,
  groupId,
}) {
  const classNames = [className, styles[size], "column", "row", "p-0", "m-1", "flex-column"];
  return (
    <Div className={classNames.join(" ")}>
      {
        (isCreator || groupType === GroupType.public) &&
        <Input className="column addMemberInput" type="button" defaultValue="add new member" onClick={onClickAddMember} />
      }
      {
        usersInGroup &&
        usersInGroup.map(userInGroup => 
          <SimpleContentContainer
            id={groupId}
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