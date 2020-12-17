import React, {useState} from 'react';
import Title from '../../../atoms/Title';
import ApplicationModel from '../../../../containers/Models/ApplicationModel'
import RequestToAddForm from '../../../molecules/RequestToAddForm'
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';



export default function AddApplicationModal(props) {
  const [application, setApplication] = useState("");
  function handleOnChangeApplication(e) {
    setApplication(e.target.value);
  }
  function createApplication() {
    return new ApplicationModel(application, undefined, props.selectedGroupId, props.simpleMe);
  }
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
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
    </Modal>
  )
}