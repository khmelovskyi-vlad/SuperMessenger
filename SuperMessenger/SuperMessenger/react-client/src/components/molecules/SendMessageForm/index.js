import React from 'react';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';

import styles from './style.module.css'

export default function SendMessageForm({
  className,
  size,
  onSubmitSendMessage,
  createMessage,
  onChange,
}) {
  const classNames = [className, styles[size],
    "col-9", "row", "flex-nowrap", "p-0", "m-0", "sendMessageForm"];
  return (
    <Form className={classNames.join(" ")}
      onSubmit={(e) => onSubmitSendMessage(e, createMessage())}
    >
      <Input onChange={onChange} maxLength="1500" className="mx-1" type="text"/>
      <Input type="submit" />
    </Form>
  );
}