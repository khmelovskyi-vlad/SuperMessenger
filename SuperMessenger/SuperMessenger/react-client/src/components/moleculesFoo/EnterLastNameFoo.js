import React from 'react';
import Div from '../atoms/Div';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
export default function LastNameFoo(props) {
  return (
    <Div>
      <Label htmlFor="newLastName" value="Last name: "/>
      <Input onChange={props.onChange} name="newLastName" />
    </Div>
  );
}