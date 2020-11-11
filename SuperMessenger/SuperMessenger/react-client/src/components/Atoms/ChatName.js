import React from 'react';
export default function ChatName(props) {
  return (
    <div className="column m-0 p-0 row flex-column">
      {props.group.type === "Chat"
        ? <p className="column m-0">{props.group.usersInGroup[0].id === props.myId
          ? props.group.usersInGroup[1].id
          : props.group.usersInGroup[0].id}</p>
        :
        <>
          <p className="column m-0">{props.group.name}</p>
          <p className="column m-0">{props.group.usersInGroup.length}</p>
        </>}
    </div>
  );
}