import React, {useState} from 'react';
import Chat from '../../components/templates/Chat';
import MessageModel from '../../Models/MessageModel';


export default function ChatContainer({
  className,
  size,
  onSubmitSendFiles,
  groupData,
  simpleMe,
  showGroupInfo,
  onClickShowGroupInfo,
  onScrollMessage,
  renderMessageScrollButton,
  onClickMessageScrollButton,
  onSubmitSendMessage,
}) {
  const [message, setMessage] = useState("");

  function handleChangeMessage(event) {
    setMessage(event.target.value);
  }
  function handleChangeFile(event) {
    onSubmitSendFiles(event, event.target.files);
  }
  function handleCreateMessage() {
    return new MessageModel(undefined, message, undefined, groupData.id, simpleMe, false);
  }
  

  return (
    <Chat
      className={className}
      size={size}
      showGroupInfo={showGroupInfo}
      simpleMe={simpleMe}
      groupData={groupData}
      onClickShowGroupInfo={onClickShowGroupInfo}
      onScrollMessage={onScrollMessage}
      renderMessageScrollButton={renderMessageScrollButton}
      onClickMessageScrollButton={onClickMessageScrollButton}
      onSubmitSendMessage={onSubmitSendMessage}
      onChangeMessage={handleChangeMessage}
      onCreateMessage={handleCreateMessage}
      onChangeFile={handleChangeFile}
    />
  );
}