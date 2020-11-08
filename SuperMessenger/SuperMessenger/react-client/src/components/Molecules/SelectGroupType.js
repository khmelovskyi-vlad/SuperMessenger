import React from 'react';
import Option from '../Atoms/Option';
export default function GroupType(props){
  return (
    <select onChange={props.onChange}>
      <Option value="public" content="public"/>
      <Option value="private" content="private"/>
      <Option value="chat" content="chat"/>
    </select>
  )
}