import React from 'react';
import Div from '../../atoms/Div';
import LastMessage from '../../molecules/LastMessage';
import SimpleContent from '../../organisms/SimpleContent';

import styles from './style.module.css'

export default function Groups(props) {
  return (
    <Div className="col-4 m-0 p-0">
      <Div className="row flex-column w-100 m-0 p-0 flex-nowrap" style={{overflowY: "auto", overflowX: "hidden", maxHeight: "90vh"}}>
        {
          props.groups && props.groups.sort((a, b) => {
            if (a.lastMessage.sendDate == undefined) {
              return 1;
            }
            if (b.lastMessage.sendDate == undefined) {
              return -1;
            }
            return  b.lastMessage.sendDate - a.lastMessage.sendDate;
          })
            .map(group =>
            <SimpleContent
              onClickSelectId={props.onClickSelectedGroup}
              id={group.id}
              key={group.id}
              simpleContentClasses="simpleGroupContent"
              imgContentClasses="simpleImgContent"
              imgClasses="simpleImg" 
              simpleNameClasses="simpleName"
              isUser={false}
              imageId={group.imageId}
              name={group.name}
              bottomData={<LastMessage lastMessage={group.lastMessage}/>}
            />)
        }
      </Div>
    </Div>
  );
}