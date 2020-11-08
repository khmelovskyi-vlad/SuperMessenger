import React from 'react';
import Input from '../Atoms/Input';
import Label from '../Atoms/Label';
export default function Upload(props) {
  return (
    <div>
      <Label for={props.newProfileAvatar} value="Group avatar: "/>
      <Input onChange={props.onChange} name={props.newProfileAvatar} type="file" accept="image/*"/>
    </div>
  );
}