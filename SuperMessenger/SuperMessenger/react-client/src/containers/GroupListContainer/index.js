import React from 'react';
import Groups from '../../components/templates/Groups';


export default function GroupListContainer(props) {
  function getGroupList() {
    if (props.groups) {
      return props.groups.sort((a, b) => {
        if (!a.lastMessage) {
          return 1;
        }
        if (!b.lastMessage) {
          return -1;
        }
        return b.lastMessage.sendDate - a.lastMessage.sendDate;
      });
    }
    return undefined;
  }
  return (
    <Groups
      className={props.className}
      size={props.size}
      onClickSelectedGroup={props.onClickSelectedGroup}
      groups={getGroupList()}
    />
  );
}