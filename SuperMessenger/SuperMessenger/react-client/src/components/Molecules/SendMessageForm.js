import React, { useState } from 'react';
import Message from '../../Message';
import SimpleUser from '../../SimpleUser';
import Input from '../Atoms/Input';
import Label from '../Atoms/Label';
export default function SendMessageForm(props) {
  const [message, setMessage] = useState("");
  function handleChangeMessage(event) {
    setMessage(event.target.value);
  }
  function createMessage() {
    return new Message(null, message, null, props.groupId, props.simpleMe);
  }
  return (
    <form className="col-1 row" onSubmit={() => props.onSubmitSendMessage(createMessage())}>
      <Input onChange={handleChangeMessage} type="text" name="sendMessage"/>
      <Label for="sendMessage" value="click"/>
    </form>
  );
}