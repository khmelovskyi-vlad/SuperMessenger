import React from 'react';
import GroupInfoHead from './GroupInfoHead';
import Members from './Members';
export default function GroupInfo(props) {
  return (
    <div className="col-3 row m-0 flex-column">
      <GroupInfoHead group={props.groupData} />
      <Members
        isCreator={props.groupData.isCreator}
        imageId={props.groupData.imageId}
        groupName={props.groupData.name}
        onClickNewMember={props.onClickNewMember}
      />
    </div>
  );
}