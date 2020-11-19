import React from 'react'
import AddApplicationModalForm from '../Molecules/AddApplicationModalForm'
import "./Modal.css"
export default function AddApplicationModal(props) {
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <h1 className="modal-title">Add application</h1>
        <AddApplicationModalForm
          // simpleGroup={props.simpleGroup}
          onClickBackModal={props.onClickBackModal}
          selectedGroupId={props.selectedGroupId}
          simpleMe={props.simpleMe}
          onSubmitAddApplication={props.onSubmitAddApplication}
        />
      </div>
    </div>
  )
}