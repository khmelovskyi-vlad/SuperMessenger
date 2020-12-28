import React from 'react';
import GroupType from '../../../Entities/Enums/GroupType';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';
import Span from '../../atoms/Span';

import styles from './style.module.css'

export default function EnteringGroupName({
  className,
  size,
  onChange,
  groupType,
  canUseGroupName,
}) {
  const classNames = [className, styles[size]];
  return (
    <Div className={classNames.join(" ")}>
      <Label htmlFor="newGroupName" value="Group name: "/>
      <Input onChange={onChange} name="newGroupName" maxLength="50" />
      {
        groupType === GroupType.public && canUseGroupName !== undefined && canUseGroupName !== null &&
        <Span>{canUseGroupName ? "can use" : "can't use"}</Span>
      }
    </Div>
  );
}