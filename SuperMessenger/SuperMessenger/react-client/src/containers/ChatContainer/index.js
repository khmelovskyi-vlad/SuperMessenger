import React, {useState} from 'react';
import Chat from '../../components/templates/Chat';
import MessageModel from '../Models/MessageModel';


export default function ChatContainer(props) {
  const [message, setMessage] = useState("");

  function handleChangeMessage(event) {
    setMessage(event.target.value);
  }
  function handleChangeFile(event) {
    props.onSubmitSendFiles(event, event.target.files);
  }
  function handleCreateMessage() {
    return new MessageModel(undefined, message, undefined, props.groupData.id, props.simpleMe, false);
  }
  

  return (
    <Chat
      className={props.className}
      size={props.size}
      showGroupInfo={props.showGroupInfo}
      simpleMe={props.simpleMe}
      groupData={props.groupData}
      onClickShowGroupInfo={props.onClickShowGroupInfo}
      showGroupInfo={props.showGroupInfo}
      onScrollMessage={props.onScrollMessage}
      renderMessageScrollButton={props.renderMessageScrollButton}
      onClickMessageScrollButton={props.onClickMessageScrollButton}
      onSubmitSendMessage={props.onSubmitSendMessage}
      onSubmitSendFiles={props.onSubmitSendFiles}
      onChangeMessage={handleChangeMessage}
      onCreateMessage={handleCreateMessage}
      onChangeFile={handleChangeFile}
    />
  );
}