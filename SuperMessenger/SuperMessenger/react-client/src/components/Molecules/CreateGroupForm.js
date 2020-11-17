import React, {useState, useEffect, useRef} from 'react';
import NewGroup from '../../Models/NewGroup';
import SelectGroupType from './SelectGroupType';
import EnterGroupName from './EnterGroupName';
import Upload from './Upload';
import Input from '../Atoms/Input';
import "../Modals/Modal.css"
export default function CreateGroupForm(props) {
  // const [group, setGroup] = useState(new NewGroup());
  const [groupType, setGroupType] = useState("public");
  const [groupName, setGroupName] = useState("");
  const [formData, setFormData] = useState(new FormData());
  // const group = useRef(new NewGroup());
  function handleChangeGroupType(event) {
    setGroupType(event.target.value);
  }
  function handleChangeGroupName(event) {
    props.onChangeGroupName(event.target.value);
    setGroupName(event.target.value);
  }
  function handleChangeGroupAvatar(event) {
    // setFormData(new FormData(event.target));
    console.log(formData);
    formData.append("GroupImg", event.target.files[0]);
    // console.log(event);
    // console.log(event.target);
    // console.log(event.target.value);
    // console.log(event.target.files);
    // console.log(event.target.files[0]);
    // console.log(event.target.value);
  }
  function handleOnSubmit(event) {
    if (groupType.length > 0 && groupName.length > 0) {
      console.log("can create");
      formData.append("GroupType", groupType);
      formData.append("GroupName", groupName);
      props.api.current.sendNewGroup(formData);
      // const newGroup = new NewGroup(groupName, groupType);
      // console.log(newGroup);
      // // props.api.current.createGroup(newGroup);
      // props.api.current.createGroup(groupType, groupName, formData.get("file"));
    }
    event.preventDefault();
  }
  return (
    <form className="column"
      // onSubmit={handleOnSubmit}>
      onSubmit={(e) => props.onSubmitCreateGroup(e, formData, groupType, groupName, props.invitations)}>
      <SelectGroupType onChange={handleChangeGroupType}/>
      {
        (groupType === "public" || groupType === "private") &&
        <EnterGroupName
          onChange={handleChangeGroupName}
          groupType={groupType}
          canUseGroupName={props.canUseGroupName}
        />
      }
      <Upload onChange={handleChangeGroupAvatar} name={"groupAvatar"} />
      <label className="modal-label" htmlFor="searchUser">Write email</label>
      <input className="modal-input" type="text" name="searchUser" onChange={props.onChangeSearchUsers}/>
      <Input type="submit" class="m-1" />
    </form>
  );
}