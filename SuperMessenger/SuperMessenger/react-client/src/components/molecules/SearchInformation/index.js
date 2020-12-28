import React from 'react';
import Input from '../../atoms/Input'
import Label from '../../atoms/Label'


export default function SearchInformation({
  name,
  value,
  onChange,
  onClickBackModal,
}) {
  return (
    <>
      <Label className="modal-label" htmlFor={name}>{value}</Label>
      <Input className="modal-input" type="text" name={name} onChange={onChange}/>
      <Input type="button" onClick={onClickBackModal} defaultValue="back"/>
    </>
  )
}