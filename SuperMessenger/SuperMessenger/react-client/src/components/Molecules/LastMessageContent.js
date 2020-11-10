import React from 'react';
import LastMesssage from '../Atoms/LastMesssage';
export default function LastMesssageContent(props) {
  return (
    <div className="column row justify-content-between">
      {props.lastMesssage.value ?
        <>
          {/* <LastMesssage value="value"/> */}
          <LastMesssage value={props.lastMesssage.value}/>
          {/* <LastMesssage value="sendDate"/> */}
          <LastMesssage value={`${props.lastMesssage.sendDate.getHours()}:${props.lastMesssage.sendDate.getMinutes()}`}/>
        </>
        :
          <LastMesssage value="don't have messages"/>}
    </div>
  );
}