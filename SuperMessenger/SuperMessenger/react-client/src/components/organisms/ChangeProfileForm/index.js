import React, {useState} from 'react';
import Form from '../../atoms/Form';
import EnteringName from '../../molecules/EnteringName';
import Upload from '../../molecules/Upload';
import Input from '../../atoms/Input';

import styles from './style.module.css'

export default function ChangeProfileForm(props) {
  const className = [props.className, styles[props.size], "column", "p-0"];
  
  const [myFirstName, setMyFirstName] = useState("");
  const [myLastName, setMyLastName] = useState("");
  const [avatar, setAvatar] = useState(null);
  
  function handleChangeMyFirstName(event) {
    setMyFirstName(event.target.value);
  }
  function handleChangeMyLastName(event) {
    setMyLastName(event.target.value);
  }
  function handleChangeAvatar(event) {
    setAvatar(event.target.files[0]);
  }
  return (
    <Form className={className.join(" ")}
      onSubmit={(e) => props.onSubmitChangeProfile(e, myFirstName, myLastName, avatar)}>
      <EnteringName name="newFirstName" value="First name: " onChange={handleChangeMyFirstName}/>
      <EnteringName name="newLastName" value="Last name: " onChange={handleChangeMyLastName}/>
      <Upload onChange={handleChangeAvatar} name="newProfileAvatar"/>
      <Input type="submit" class="m-1" />
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
    </Form>
  );
}