import React from 'react';
import LastMesssageContent from './LastMessageContent';
import SimpleGroupContent from './SimpleGroupContent';
export default function Groups(props) {
  return (
    <div className="col-4 m-0 p-0">
      <div className="row flex-column w-100 m-0 p-0 flex-nowrap" style={{overflowY: "auto", overflowX: "hidden", maxHeight: "90vh"}}>
        {
          props.groups && props.groups.map(group =>
            <SimpleGroupContent
              onClickSelectedGroup={props.onClickSelectedGroup}
              groupId={group.id}
              key={group.id}
              groupContentClasses="simpleGroupContent"
              imgContentClasses="simpleImgContent"
              imgClasses="simpleImg" 
              simpleNameClasses="simpleName"
              isUser={false}
              imageId={group.imageId}
              name={group.name}
              bottomData={<LastMesssageContent lastMesssage={group.lastMesssage}/>}
            />)
          // props.groups && foreach(group in props.groups){
          //   <SimpleGroupContent group={group}/>
          // }
        }
      </div>
    </div>
  );
}