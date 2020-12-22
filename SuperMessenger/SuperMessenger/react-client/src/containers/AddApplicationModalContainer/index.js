import React, {useState} from 'react';
import AddApplicationModal from '../../components/templates/Modals/AddApplicationModal';
import ApplicationModel from '../Models/ApplicationModel';



export default function AddApplicationModalContainer(props) {
  const [application, setApplication] = useState("");
  function handleChangeApplication(e) {
    setApplication(e.target.value);
  }
  function handleCreateApplication() {
    return new ApplicationModel(application, undefined, props.selectedGroupId, props.simpleMe);
  }
  return (
    <AddApplicationModal
      wrapperRef={props.wrapperRef}
      onClickBackModal={props.onClickBackModal}
      onSubmitAddApplication={props.onSubmitAddApplication}
      onCreateApplication={handleCreateApplication}
      onChangeApplication={handleChangeApplication}
    />
  )
}