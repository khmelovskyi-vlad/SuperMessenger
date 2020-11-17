import React, { useState } from 'react';
import NewFilesModel from '../../Models/NewFilesModel';
export default function SendFileForm(props) {
  const [files, setFiles] = useState([]);
  // const [formData, setFormData] = useState(new FormData());
  function handleChangeMessage(event) {
    // formData.append("Files", event.target.files[0]);
    setFiles(prevFiles => [...prevFiles, event.target.files[0]]);
  }
  function createFileModel() {
    return new NewFilesModel(files, props.groupId/*, props.simpleMe*/);
    // return formData;
  }
  return (
    <form className="column p-0 m-0"
      onSubmit={(e) => props.onSubmitSendFiles(e, createFileModel())}
    >
      <input onChange={handleChangeMessage} className="w-25 mx-1" type="file"/>
      {/* <p className="m-0">asdasdasd</p> */}
      {/* <Label for="sendMessage" value="click"/> */}
      <input type="submit"/>
    </form>
  );
}