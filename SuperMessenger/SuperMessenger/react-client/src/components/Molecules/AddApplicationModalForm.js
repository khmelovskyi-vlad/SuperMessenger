import React, {useState} from 'react'
import Application from '../../Models/Application';
import "../Modals/Modal.css"
export default function AddApplicationModalForm(props) {
  const [application, setApplication] = useState("");
  function handleOnChangeApplication(e) {
    setApplication(e.target.value);
  }
  function createApplication() {
    return new Application(application, undefined, props.selectedGroupId, props.simpleMe);
  }
  return (
    <form className="row m-0 flex-column" onSubmit={(e) => props.onSubmitAddApplication(e, createApplication())}>
      <label className="modal-label" htmlFor="addApplication">Write application</label>
      <textarea
        className="modal-textarea"
        rows="4"
        maxLength="150"
        type="text"
        name="addApplication"
        onChange={handleOnChangeApplication} />
      <input className="modal-input" type="submit" value="send application"/>
    </form>
  )
}