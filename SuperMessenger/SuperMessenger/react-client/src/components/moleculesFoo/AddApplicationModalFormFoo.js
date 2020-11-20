import React, {useState} from 'react'
import Application from '../../containers/Models/Application';
import Form from '../atoms/Form';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Textarea from '../atoms/Textarea';
import "../Modals/Modal.css"
export default function AddApplicationModalFormFoo(props) {
  const [application, setApplication] = useState("");
  function handleOnChangeApplication(e) {
    setApplication(e.target.value);
  }
  function createApplication() {
    return new Application(application, undefined, props.selectedGroupId, props.simpleMe);
  }
  return (
    <Form className="row m-0 flex-column" onSubmit={(e) => props.onSubmitAddApplication(e, createApplication())}>
      <Label className="modal-label" htmlFor="addApplication">Write application</Label>
      <Textarea
        className="modal-textarea"
        rows="4"
        maxLength="150"
        type="text"
        name="addApplication"
        onChange={handleOnChangeApplication}
      />
      <Input className="modal-input" type="submit" value="send application"/>
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
    </Form>
  )
}