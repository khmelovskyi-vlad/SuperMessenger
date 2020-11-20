import React, {useState} from 'react';
import Upload from '../molecules/Upload';
import Input from '../atoms/Input';
import Form from '../atoms/Form';
import EnteringName from '../molecules/EnteringName';
export default function ChangeProfileForm(props) {
  // const [group, setGroup] = useState(new NewGroup());
  const [myFirstName, setMyFirstName] = useState("");
  const [myLastName, setMyLastName] = useState("");
  const [avatar, setAvatar] = useState(null);
  // const [formData, setFormData] = useState(new FormData());
  // const group = useRef(new NewGroup());
  function handleChangeMyFirstName(event) {
    setMyFirstName(event.target.value);
  }
  function handleChangeMyLastName(event) {
    setMyLastName(event.target.value);
  }
  function handleChangeAvatar(event) {
    setAvatar(event.target.files[0]);
    // formData.append("Avatar", event.target.files[0]);
  }
  // function handleOnSubmit(event) {
  //   if (myFirstName.length > 0 && myLastName.length > 0) {
  //     console.log("can create");
  //     formData.append("FirstName", myFirstName);
  //     formData.append("LastName", myLastName);
  //     props.api.current.changeProfile(formData);
  //   }
  //   event.preventDefault();
  // }
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