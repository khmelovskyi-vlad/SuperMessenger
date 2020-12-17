import React from 'react';
import GroupType from '../../../containers/Enums/GroupType';
import Option from '../../atoms/Option';
import Select from '../../atoms/Select';

import styles from './style.module.css'

export default function SelectGroupType(props){
  const className = [props.className, styles[props.size]];
  return (
    <Select className={className.join(" ")} onChange={props.onChange}>
      <Option value={GroupType.public} children="public"/>
      <Option value={GroupType.private} children="private"/>
      <Option value={GroupType.chat} children="chat"/>
    </Select>
  )
}