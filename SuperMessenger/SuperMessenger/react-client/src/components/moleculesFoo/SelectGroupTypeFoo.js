import React from 'react';
import Option from '../atoms/Option';
import Select from '../atoms/Select';
export default function GroupTypeFoo(props){
  return (
    <Select onChange={props.onChange}>
      <Option value="public" children="public"/>
      <Option value="private" children="private"/>
      <Option value="chat" children="chat"/>
    </Select>
  )
}