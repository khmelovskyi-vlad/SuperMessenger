import React, {useState, useEffect, useRef} from 'react';
import SelectGroupType from '../molecules/SelectGroupType';
import Upload from '../molecules/Upload';
import Input from '../atoms/Input';
import "../Modals/Modal.css"
import Form from '../atoms/Form';
import Label from '../atoms/Label';
import EnteringGroupName from '../molecules/EnteringGroupName';
import SearchInformation from '../molecules/SearchInformation';
export default function CreateGroupForm(props) {
  const [groupType, setGroupType] = useState("public");
  const [groupName, setGroupName] = useState("");
  const [formData, setFormData] = useState(new FormData());
  function handleChangeGroupType(event) {
    setGroupType(event.target.value);
  }
  function handleChangeGroupName(event) {
    props.onChangeGroupName(event.target.value);
    setGroupName(event.target.value);
  }
  function handleChangeGroupAvatar(event) {
    console.log(formData);
    formData.append("GroupImg", event.target.files[0]);
  }
  // function handleOnSubmit(event) {
  //   if (groupType.length > 0 && groupName.length > 0) {
  //     console.log("can create");
  //     formData.append("GroupType", groupType);
  //     formData.append("GroupName", groupName);
  //     props.api.current.sendNewGroup(formData);
  //   }
  //   event.preventDefault();
  // }
  return (
    <Form className="column"
      onSubmit={(e) => props.onSubmitCreateGroup(e, formData, groupType, groupName, props.invitations)}>
      <SelectGroupType onChange={handleChangeGroupType}/>
      {
        (groupType === "public" || groupType === "private") &&
        <>
          <EnteringGroupName
            onChange={handleChangeGroupName}
            groupType={groupType}
            canUseGroupName={props.canUseGroupName}
          />
          <Upload onChange={handleChangeGroupAvatar} name={"groupAvatar"} />
        </>
      }
      <SearchInformation
          name="searchUser"
          value="Write email"
          onClickBackModal={props.onClickBackModal} 
          onChange={props.onChangeSearchUsers}
      />
      {/* <Label className="modal-label" htmlFor="searchUser">Write email</Label>
      <Input className="modal-input" type="text" name="searchUser" onChange={props.onChangeSearchUsers}/>
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/> */}
      <Input type="submit" class="m-1" />
    </Form>
  );
}