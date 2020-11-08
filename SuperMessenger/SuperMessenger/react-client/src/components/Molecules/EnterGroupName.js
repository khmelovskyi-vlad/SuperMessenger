import React from 'react';
import Input from '../Atoms/Input';
import Label from '../Atoms/Label';
export default function GroupName(props) {
  return (
    <div>
      <Label for="newGroupName" value="Group name: "/>
      <Input onChange={props.onChange} name="newGroupName" />
    </div>
  );
}