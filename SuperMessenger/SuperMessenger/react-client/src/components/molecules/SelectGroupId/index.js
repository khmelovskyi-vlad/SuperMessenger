import React from 'react';
import Option from '../../atoms/Option';
import Select from '../../atoms/Select';

import styles from './style.module.css'

export default function SelectGroupId(props) {
  const className = [props.className, styles[props.size]];
  return (
    <Select className={className.join(" ")} onChange={props.onChange}>
      {props.groups.map(group => <Option value={group.id} content={group.id}/>)}
    </Select>
  )
}