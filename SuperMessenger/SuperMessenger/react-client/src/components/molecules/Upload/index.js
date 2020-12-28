import React from 'react';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';

import styles from './style.module.css'

export default function Upload({
  className,
  size,
  name,
  onChange,
}) {
  const classNames = [className, styles[size]];
  return (
    <Div className={classNames.join(" ")}>
      <Label htmlFor={name} value="Group avatar: "/>
      <Input onChange={onChange} name={name} type="file" accept="image/*"/>
    </Div>
  );
}