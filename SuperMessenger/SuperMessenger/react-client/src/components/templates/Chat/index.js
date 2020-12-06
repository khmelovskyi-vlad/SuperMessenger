import React, {useState} from 'react';
import MessageModel from '../../../containers/Models/MessageModel';
import Div from '../../atoms/Div';
import SendFileForm from '../../molecules/SendFileForm';
import SendMessageForm from '../../molecules/SendMessageForm';
import ChatOptions from '../../organisms/ChatOptions';
import ChatMessages from '../../organisms/ChatMessages';

import styles from './style.module.css'

export default function Chat(props) {
  const [message, setMessage] = useState("");
  // const [files, setFiles] = useState([]);
  function handleChangeMessage(event) {
    setMessage(event.target.value);
  }
  function handleChangeFile(event) {
    // setFiles(prevFiles => [...prevFiles, event.target.files[0]]);
    props.onSubmitSendFiles(event, event.target.files);
  }
  function createMessage() {
    return new MessageModel(undefined, message, undefined, props.groupData.id, props.simpleMe, false);
  }
  const classList = ["row", "p-0", "m-0", "flex-column", "flex-nowrap", props.showGroupInfo ? "col-5" : "col-8"];
  return (
    <Div
      id="Chat"
      className={classList.join(" ")}
      style={{ maxHeight: "90vh" }}
    >
      <ChatOptions
        myId={props.simpleMe.id}
        group={props.groupData}
        onClickShowGroupInfo={props.onClickShowGroupInfo}
        showGroupInfo={props.showGroupInfo}
      />
      <ChatMessages myId={props.simpleMe.id} messages={props.groupData.messages} sentFiles={props.groupData.sentFiles} />
      <Div className="row m-0 p-0 w-100 flex-nowrap" >
        <SendMessageForm
          onSubmitSendMessage={props.onSubmitSendMessage}
          onChange={handleChangeMessage}
          createMessage={createMessage}
        />
        <SendFileForm
          onSubmitSendFiles={props.onSubmitSendFiles}
          onChange={handleChangeFile}
        />
      </Div>
    </Div>
  );
}