import React from 'react';
import LastMesssage from '../Atoms/LastMessage';
export default function SimpleGroupContent(props) {
  console.log(props.group.lastMesssage)
  return (
    <div className="column simpleGroupContent">
      <div className="row m-0">
        <img src={ `/groupImgs/${props.group.imageId}`} className="m-1"/>
          <div className="column">
            <div className="row flex-column m-0">
              <p>{props.group.name}</p>
              <LastMesssage lastMesssage={props.group.lastMesssage}/>
            </div>
        </div>
      </div>
    </div>
  );
}