import React from 'react';
import Option from '../atoms/Option';
import Select from '../atoms/Select';
export default function SelectGroupIdFoo(props){
  return (
    <Select onChange={props.onChange}>
      {props.groups.map(group => <Option value={group.id} content={group.id}/>)}
    </Select>
  )
}