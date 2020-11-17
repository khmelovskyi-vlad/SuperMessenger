import React from 'react';
import Input from '../Atoms/Input';
import Label from '../Atoms/Label';
export default function GroupName(props) {
  return (
    <div>
      <Label for="newGroupName" value="Group name: "/>
      <Input onChange={props.onChange} name="newGroupName" />
      {
        props.groupType === "public" && props.canUseGroupName != undefined && props.canUseGroupName != null &&
        <span>{props.canUseGroupName ? "can use" : "can't use"}</span>
      }
    </div>
  );
}