import React from 'react';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

import styles from './style.module.css'

export default function Upload(props) {
  return (
    <Div>
      <Label htmlFor={props.newProfileAvatar} value="Group avatar: "/>
      <Input onChange={props.onChange} name={props.newProfileAvatar} type="file" accept="image/*"/>
    </Div>
  );
}