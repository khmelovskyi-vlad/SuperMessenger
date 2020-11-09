import React from 'react';
export default function ChatName(props) {
  return (
    <div className="column row flex-column">
      {props.group.type === "Chat"
        ? <p className="column">{props.group.usersInGroup[0].id === props.myId
          ? props.group.usersInGroup[1].id
          : props.group.usersInGroup[0].id}</p>
        :
        <>
          <p className="column">{props.group.name}</p>
          <p className="column">{props.group.usersInGroup.length}</p>
        </>}
    </div>
  );
}