import React from 'react';
import Form from '../../atoms/Form';
import EnteringName from '../../molecules/EnteringName';
import Upload from '../../molecules/Upload';
import Input from '../../atoms/Input';

import styles from './style.module.css'

export default function ChangeProfileForm(props) {
  const className = [props.className, styles[props.size], "column", "p-0"];
  
  return (
    <Form className={className.join(" ")}
      onSubmit={props.onSubmitChangeProfile}>
      <EnteringName name="newFirstName" value="First name: " onChange={props.onChangeMyFirstName}/>
      <EnteringName name="newLastName" value="Last name: " onChange={props.handleChangeMyLastName}/>
      <Upload onChange={props.handleChangeAvatar} name="newProfileAvatar"/>
      <Input type="submit" class="m-1" />
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
    </Form>
  );
}