import React from 'react';
import Div from '../atoms/Div';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
export default function FirstNameFoo(props) {
  return (
    <Div>
      <Label htmlFor="newFirstName" value="First name: "/>
      <Input onChange={props.onChange} name="newFirstName" />
    </Div>
  );
}