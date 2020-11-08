import React from 'react';
import Input from '../Atoms/Input';
import Label from '../Atoms/Label';
export default function FirstName(props) {
  return (
    <div>
      <Label for="newFirstName" value="First name: "/>
      <Input onChange={props.onChange} name="newFirstName" />
    </div>
  );
}