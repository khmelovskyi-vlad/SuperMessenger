import React from 'react';
import SimpleGroupContent from './SimpleGroupContent';
export default function Groups(props) {
  return (
    <div className="col-3">
      <div className="row flex-column w-100 m-0 p-0">
        {
          props.groups && props.groups.map(group => <SimpleGroupContent key={group.id} group={group}/>)
          // props.groups && foreach(group in props.groups){
          //   <SimpleGroupContent group={group}/>
          // }
        }
      </div>
    </div>
  );
}