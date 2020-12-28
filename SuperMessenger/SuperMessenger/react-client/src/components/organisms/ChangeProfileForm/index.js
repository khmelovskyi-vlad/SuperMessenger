import React from 'react';
import Form from '../../atoms/Form';
import EnteringName from '../../molecules/EnteringName';
import Upload from '../../molecules/Upload';
import Input from '../../atoms/Input';

import styles from './style.module.css'

export default function ChangeProfileForm({
  className,
  size,
  onSubmitChangeProfile,
  onChangeMyFirstName,
  onChangeMyLastName,
  onChangeAvatar,
  onClickBackModal,
}) {
  const classNames = [className, styles[size], "column", "p-0"];
  
  return (
    <Form className={classNames.join(" ")}
      onSubmit={onSubmitChangeProfile}>
      <EnteringName name="newFirstName" value="First name: " onChange={onChangeMyFirstName}/>
      <EnteringName name="newLastName" value="Last name: " onChange={onChangeMyLastName}/>
      <Upload onChange={onChangeAvatar} name="newProfileAvatar"/>
      <Input type="submit" class="m-1" />
      <Input type="button" onClick={onClickBackModal} defaultValue="back"/>
    </Form>
  );
}