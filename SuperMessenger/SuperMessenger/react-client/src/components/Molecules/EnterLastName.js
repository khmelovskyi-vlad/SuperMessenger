import React from 'react';
import Input from '../Atoms/Input';
import Label from '../Atoms/Label';
export default function LastName(props) {
  return (
    <div>
      <Label for="newLastName" value="Last name: "/>
      <Input onChange={props.onChange} name="newLastName" />
    </div>
  );
}