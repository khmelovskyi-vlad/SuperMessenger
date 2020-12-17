import React from 'react';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

import styles from './style.module.css'

export default function EnteringName(props) {
  const className = [props.className, styles[props.size]];
  return (
    <Div className={className.join(" ")}>
      <Label htmlFor={props.name} value={props.value}/>
      <Input onChange={props.onChange} name={props.name} maxlength="150"/>
    </Div>
  );
}