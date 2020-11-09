import React, {useState, useEffect, useRef} from 'react';
import Upload from './Upload';
import Input from '../Atoms/Input';
import FirstName from './EnterFirstName';
import LastName from './EnterLastName';
export default function ChangeProfile(props) {
  // const [group, setGroup] = useState(new NewGroup());
  const [myFirstName, setMyFirstName] = useState("");
  const [myLastName, setMyLastName] = useState("");
  const [formData, setFormData] = useState(new FormData());
  // const group = useRef(new NewGroup());
  function handleChangeMyFirstName(event) {
    setMyFirstName(event.target.value);
  }
  function handleChangeMyLastName(event) {
    setMyLastName(event.target.value);
  }
  function handleChangeAvatar(event) {
    formData.append("Avatar", event.target.files[0]);
  }
  function handleOnSubmit(event) {
    if (myFirstName.length > 0 && myLastName.length > 0) {
      console.log("can create");
      formData.append("FirstName", myFirstName);
      formData.append("LastName", myLastName);
      props.api.current.changeProfile(formData);
    }
    event.preventDefault();
  }
  return (
    <form className="col-8 p-0"
      onSubmit={handleOnSubmit}>
      <FirstName onChange={handleChangeMyFirstName}/>
      <LastName onChange={handleChangeMyLastName}/>
      <Upload onChange={handleChangeAvatar} name="newProfileAvatar"/>
      <Input type="submit" class="m-1" />
      </form>
  );
}