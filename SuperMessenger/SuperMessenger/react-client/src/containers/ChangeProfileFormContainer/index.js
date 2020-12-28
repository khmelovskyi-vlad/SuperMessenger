import React, {useState} from 'react';
import ChangeProfileForm from '../../components/organisms/ChangeProfileForm';

export default function ChangeProfileFormContainer({
  className,
  size,
  onClickBackModal,
  onSubmitChangeProfile,
}) {
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
  function handleSubmitChangeProfile(event) {
    onSubmitChangeProfile(event, myFirstName, myLastName, avatar);
  }
  return (
    <ChangeProfileForm
      className={className}
      size={size}
      onClickBackModal={onClickBackModal}
      onChangeMyFirstName={handleChangeMyFirstName}
      onChangeMyLastName={handleChangeMyLastName}
      onChangeAvatar={handleChangeAvatar}
      onSubmitChangeProfile={handleSubmitChangeProfile}
    />
  );
}