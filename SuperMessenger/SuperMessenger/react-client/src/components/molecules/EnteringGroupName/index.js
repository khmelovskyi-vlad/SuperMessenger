import React from 'react';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';
import Span from '../../atoms/Span';

import styles from './style.module.css'

export default function EnteringGroupName(props) {
  return (
    <Div>
      <Label htmlFor="newGroupName" value="Group name: "/>
      <Input onChange={props.onChange} name="newGroupName" maxLength="50" />
      {
        props.groupType === "public" && props.canUseGroupName != undefined && props.canUseGroupName != null &&
        <Span>{props.canUseGroupName ? "can use" : "can't use"}</Span>
      }
    </Div>
  );
}