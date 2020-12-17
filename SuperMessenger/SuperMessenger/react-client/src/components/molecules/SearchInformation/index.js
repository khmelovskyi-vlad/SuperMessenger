import React from 'react';
import Input from '../../atoms/Input'
import Label from '../../atoms/Label'


export default function SearchInformation(props) {
  return (
    <>
      <Label className="modal-label" htmlFor={props.name}>{props.value}</Label>
      <Input className="modal-input" type="text" name={props.name} onChange={props.onChange}/>
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
    </>
  )
}