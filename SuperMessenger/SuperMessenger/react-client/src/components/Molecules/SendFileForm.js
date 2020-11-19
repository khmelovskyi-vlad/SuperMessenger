import React, { useState } from 'react';
import ImgPaths from '../../ImgPaths';
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
  const imgPaths = new ImgPaths();
  return (
    <form className="col-3 p-0 m-0 h-25 row align-items-start"
      onSubmit={(e) => props.onSubmitSendFiles(e, createFileModel())}
    >
      <label className="m-0 h-25" htmlFor="file-input">
        <img className="sendFileButton mx-1 column p-0" src={imgPaths.join(imgPaths.imgs, "sendFileButton.png")} alt="select file"/>
      </label>
      <input id="file-input" onChange={handleChangeMessage} type="file" style={{display: "none"}} />
      {/* <img src={imgPaths.join(imgPaths.imgs, "sendFileButton.png")}/> */}
      {/* <p className="m-0">asdasdasd</p> */}
      {/* <Label for="sendMessage" value="click"/> */}
      {/* <input type="submit"/> */}
    </form>
  );
}