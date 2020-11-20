import React from 'react';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

import styles from './style.module.css'

export default function EnteringName(props) {
  return (
    <Div>
      <Label htmlFor={props.name} value={props.value}/>
      <Input onChange={props.onChange} name={props.name} />
    </Div>
  );
}