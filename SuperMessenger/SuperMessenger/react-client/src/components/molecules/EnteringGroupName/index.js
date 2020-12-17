import React from 'react';
import GroupType from '../../../containers/Enums/GroupType';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';
import Span from '../../atoms/Span';

import styles from './style.module.css'

export default function EnteringGroupName(props) {
  const className = [props.className, styles[props.size]];
  return (
    <Div className={className.join(" ")}>
      <Label htmlFor="newGroupName" value="Group name: "/>
      <Input onChange={props.onChange} name="newGroupName" maxLength="50" />
      {
        props.groupType === GroupType.public && props.canUseGroupName != undefined && props.canUseGroupName != null &&
        <Span>{props.canUseGroupName ? "can use" : "can't use"}</Span>
      }
    </Div>
  );
}