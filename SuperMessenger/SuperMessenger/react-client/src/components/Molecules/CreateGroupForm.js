import React, {useState, useEffect, useRef} from 'react';
import NewGroup from '../../NewGroup';
import SelectGroupType from './SelectGroupType';
import EnterGroupName from './EnterGroupName';
import Upload from './Upload';
import Input from '../Atoms/Input';
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
    <form className="col-8"
      onSubmit={handleOnSubmit}>
      <SelectGroupType onChange={handleChangeGroupType}/>
      <EnterGroupName onChange={handleChangeGroupName} />
      <Upload onChange={handleChangeGroupAvatar} name={"groupAvatar"}/>
      <Input type="submit" class="m-1" />
    </form>
  );
}