import React from 'react';
import Option from '../Atoms/Option';
export default function SelectGroupId(props){
  return (
    <select onChange={props.onChange}>
      {props.groups.map(group => <Option value={group.id} content={group.id}/>)}
    </select>
  )
}