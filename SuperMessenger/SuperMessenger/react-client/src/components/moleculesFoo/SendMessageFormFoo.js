import React, { useState } from 'react';
import Form from '../atoms/Form';
import Input from '../atoms/Input';
export default function SendMessageFormFoo(props) {
  return (
    <Form className="col-9 row flex-nowrap p-0 m-0 sendMessageForm sticky-bottom"
      onSubmit={(e) => props.onSubmitSendMessage(e, props.createMessage())}
    >
      <Input onChange={props.onChange} maxLength="1500" className="mx-1" type="text"/>
      <Input type="submit" />
    </Form>
  );
}