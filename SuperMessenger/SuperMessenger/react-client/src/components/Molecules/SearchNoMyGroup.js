import React from 'react'
import "../Modals/Modal.css"
export default function SearchNoMyGroup(props) {
  return (
    <>
      <label className="modal-label" htmlFor="searchGroup">Write name</label>
      <input className="modal-input" type="text" name="searchGroup" onChange={props.onChange}/>
    </>
  )
}