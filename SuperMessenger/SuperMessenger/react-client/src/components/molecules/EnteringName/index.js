import React from 'react';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

import styles from './style.module.css'

export default function EnteringName({
  className,
  size,
  name,
  value,
  onChange,
}) {
  const classNames = [className, styles[size]];
  return (
    <Div className={classNames.join(" ")}>
      <Label htmlFor={name} value={value}/>
      <Input onChange={onChange} name={name} maxlength="150"/>
    </Div>
  );
}