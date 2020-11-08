import React from 'react';
export default function LastMesssage(props) {
  return (
    <div className="column">
      <div className="row justify-content-between">
        {props.lastMesssage.value == undefined ?
          <><div className="column">
            <p>{"value"}</p>
            {/* <p>{props.lastMesssage.value}</p> */}
          </div>
          <div className="column">
            <p>{"sendDate"}</p>
            {/* <p>{props.lastMesssage.sendDate}</p> */}
          </div>
          </>
          :
          <div className="column">
            <p>don't have messages</p>
          </div>}
      </div>
    </div>
  );
}