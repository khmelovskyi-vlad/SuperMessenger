import React, {useState} from 'react';
import ChatMessages from './ChatMessages';
import ChatOptions from './ChatOptions';
import SendFileForm from '../molecules/SendFileForm';
import SendMessageForm from '../molecules/SendMessageForm';
import Div from '../atoms/Div';
import MessageModel from '../../containers/Models/MessageModel';
import NewFilesModel from '../../containers/Models/NewFilesModel';
export default function Chat(props) {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  function handleChangeMessage(event) {
    setMessage(event.target.value);
  }
  function handleChangeFile(event) {
    setFiles(prevFiles => [...prevFiles, event.target.files[0]]);
  }
  function createMessage() {
    return new MessageModel(undefined, message, undefined, props.groupData.id, props.simpleMe);
  }
  function createFileModel() {
    return new NewFilesModel(files, props.groupData.id);
  }
  const classList = ["row", "p-0", "m-0", "flex-column", "flex-nowrap", props.showGroupInfo ? "col-5" : "col-8"];
  return (
    <Div
      id="Chat"
      className={classList.join(" ")}
      style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "90vh" }}
    >
      <ChatOptions
        myId={props.simpleMe.id}
        group={props.groupData}
        onClickShowGroupInfo={props.onClickShowGroupInfo}
        showGroupInfo={props.showGroupInfo}
      />
      <ChatMessages myId={props.simpleMe.id} messages={props.groupData.messages} sentFiles={props.groupData.sentFiles} />
      <Div className="row m-0 p-0 w-100 mx-1 flex-nowrap" >
        <SendMessageForm
          onSubmitSendMessage={props.onSubmitSendMessage}
          onChange={handleChangeMessage}
          createMessage={createMessage}
        />
        <SendFileForm
          onSubmitSendFiles={props.onSubmitSendFiles}
          onChange={handleChangeFile}
          createFileModel={createFileModel}
        />
      </Div>
    </Div>
  );
}