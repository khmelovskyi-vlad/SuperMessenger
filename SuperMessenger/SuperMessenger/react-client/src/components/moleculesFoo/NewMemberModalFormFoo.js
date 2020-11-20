import React from 'react';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import "../Modals/Modal.css"
export default function NewMemberModalFormFoo(props) {
  return (
    <>
      <Label className="modal-label" htmlFor="searchUser">Write email</Label>
      <Input className="modal-input" type="text" name="searchUser" onChange={props.onChange}/>
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
    </>
  )
}