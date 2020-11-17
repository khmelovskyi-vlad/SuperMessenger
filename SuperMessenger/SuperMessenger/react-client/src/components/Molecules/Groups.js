import React from 'react';
import LastMessageContent from './LastMessageContent';
import SimpleContent from './SimpleContent';
export default function Groups(props) {
  return (
    <div className="col-4 m-0 p-0">
      <div className="row flex-column w-100 m-0 p-0 flex-nowrap" style={{overflowY: "auto", overflowX: "hidden", maxHeight: "90vh"}}>
        {
          props.groups && props.groups.map(group =>
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
              bottomData={<LastMessageContent lastMessage={group.lastMessage}/>}
            />)
          // props.groups && foreach(group in props.groups){
          //   <SimpleGroupContent group={group}/>
          // }
        }
      </div>
    </div>
  );
}