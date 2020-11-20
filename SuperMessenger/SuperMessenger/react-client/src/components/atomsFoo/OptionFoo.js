import React from 'react';
export default function OptionFoo(props){
  return (
    <option value={props.value}>{props.content}</option>
  )
}