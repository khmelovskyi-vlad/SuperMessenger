import React from 'react';
import Option from '../../atoms/Option';
import Select from '../../atoms/Select';

import styles from './style.module.css'

export default function SelectGroupId(props){
  return (
    <Select onChange={props.onChange}>
      {props.groups.map(group => <Option value={group.id} content={group.id}/>)}
    </Select>
  )
}