import React from 'react';
import "../Modals/Modal.css"
export default function NewMemberModalForm(props) {
  return (
    <>
      <label className="modal-label" htmlFor="searchUser">Write email</label>
      <input className="modal-input" type="text" name="searchUser" onChange={props.onChange}/>
    </>
  )
}