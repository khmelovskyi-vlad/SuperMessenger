import React from 'react';
import Groups from '../../components/templates/Groups';


export default function GroupListContainer({
  className,
  size,
  groups,
  onClickSelectedGroup,
}) {
  function getGroupList() {
    if (groups) {
      return groups.sort((a, b) => {
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
      className={className}
      size={size}
      onClickSelectedGroup={onClickSelectedGroup}
      groups={getGroupList()}
    />
  );
}