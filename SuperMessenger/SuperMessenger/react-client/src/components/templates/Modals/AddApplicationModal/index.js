import React, {useState} from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import Application from '../../../../containers/Models/Application'
import RequestToAddForm from '../../../molecules/RequestToAddForm'
// import "./Modal.css"


import styles from './style.module.css'

export default function AddApplicationModal(props) {
  const [application, setApplication] = useState("");
  function handleOnChangeApplication(e) {
    setApplication(e.target.value);
  }
  function createApplication() {
    return new Application(application, undefined, props.selectedGroupId, props.simpleMe);
  }
  return (
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">Add application</Title>
        <RequestToAddForm
          create={createApplication}
          onChange={handleOnChangeApplication}
          onClickBackModal={props.onClickBackModal}
          onSubmit={props.onSubmitAddApplication}
          name="addInvitation"
          labelValue="Write application"
          inputValue="send application"
        />
      </Div>
    </Div>
  )
}