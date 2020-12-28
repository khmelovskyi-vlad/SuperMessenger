import React from 'react';
import Div from '../../atoms/Div';
import LastMessage from '../../molecules/LastMessage';
import SimpleContentContainer from '../../../containers/SimpleContentContainer';
import GroupType from '../../../Entities/Enums/GroupType';

import styles from './style.module.css'

export default function Groups({
  className,
  size,
  groups,
  onClickSelectedGroup,
}) {
  const classNames = [className, styles[size], "col-4", " m-0", "p-0"];
  return (
    <Div className={classNames.join(" ")}>
      <Div className="row flex-column w-100 m-0 p-0 flex-nowrap"
        style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "90vh" }}>
        {
          groups && groups.map(group =>
            <SimpleContentContainer
              onClickSelectId={onClickSelectedGroup}
              id={group.id}
              key={group.id}
              simpleContentClasses="simpleGroupContent"
              imgContentClasses="simpleImgContent"
              imgClasses="simpleImg" 
              simpleNameClasses="simpleName"
              isUser={group.type === GroupType.chat ? true : false}
              imageName={group.imageName}
              name={group.name}
              bottomData={<LastMessage lastMessage={group.lastMessage}/>}
            />)
        }
      </Div>
    </Div>
  );
}