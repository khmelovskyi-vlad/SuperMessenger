import React from 'react';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

import styles from './style.module.css'

export default function Upload(props) {
  const className = [props.className, styles[props.size]];
  return (
    <Div className={className.join(" ")}>
      <Label htmlFor={props.name} value="Group avatar: "/>
      <Input onChange={props.onChange} name={props.name} type="file" accept="image/*"/>
    </Div>
  );
}