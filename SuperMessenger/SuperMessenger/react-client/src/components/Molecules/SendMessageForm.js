import React, { useState } from 'react';
import MessageModel from '../../MessageModel';
import Input from '../Atoms/Input';
import Label from '../Atoms/Label';
export default function SendMessageForm(props) {
  const [message, setMessage] = useState("");
  function handleChangeMessage(event) {
    setMessage(event.target.value);
  }
  function createMessage() {
    return new MessageModel(undefined, message, undefined, props.groupId, props.simpleMe);
  }
  return (
    <form className="column  p-0 m-0 sendMessageForm sticky-bottom" onSubmit={(e) => props.onSubmitSendMessage(e, createMessage())}>
      <Input onChange={handleChangeMessage} class="w-75 mx-1" type="text"/>
      <Input type="submit" />
      {/* <p className="m-0">asdasdasd</p> */}
      {/* <Label for="sendMessage" value="click"/> */}
    </form>
  );
}