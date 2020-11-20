import React from 'react'
import Input from '../atoms/Input'
import Label from '../atoms/Label'
import "../Modals/Modal.css"
export default function SearchNoMyGroupFoo(props) {
  return (
    <>
      <Label className="modal-label" htmlFor="searchGroup">Write name</Label>
      <Input className="modal-input" type="text" name="searchGroup" onChange={props.onChange}/>
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
    </>
  )
}