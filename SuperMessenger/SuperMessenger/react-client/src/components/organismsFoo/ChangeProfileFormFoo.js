import React, {useState} from 'react';
import Upload from '../molecules/Upload';
import Input from '../atoms/Input';
import Form from '../atoms/Form';
import EnteringName from '../molecules/EnteringName';
export default function ChangeProfileFormFoo(props) {
  
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
    <Form className="column p-0"
      onSubmit={(e) => props.onSubmitChangeProfile(e, myFirstName, myLastName, avatar)}>
      <EnteringName name="newFirstName" value="First name: " onChange={handleChangeMyFirstName}/>
      <EnteringName name="newLastName" value="Last name: " onChange={handleChangeMyLastName}/>
      <Upload onChange={handleChangeAvatar} name="newProfileAvatar"/>
      <Input type="submit" class="m-1" />
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
    </Form>
  );
}