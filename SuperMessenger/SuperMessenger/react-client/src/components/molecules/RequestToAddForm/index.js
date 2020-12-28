import React from 'react';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';
import Textarea from '../../atoms/Textarea';


import styles from './style.module.css'

export default function RequestToAddForm({
  className,
  size,
  onSubmit,
  onCreate,
  onChange,
  name,
  inputValue,
  onClickBackModal,
  labelValue,
}) {
  const classNames = [className, styles[size], "row", "m-0", "flex-column"];
  return (
    <Form className={classNames.join(" ")} onSubmit={(e) => onSubmit(e, onCreate())}>
      <Label className="modal-label" htmlFor={name}>{labelValue}</Label>
      <Textarea
        className="modal-textarea"
        rows="4"
        maxLength="150"
        type="text"
        name={name}
        onChange={onChange}
      />
      <Input className="modal-input" type="submit" value={inputValue}/>
      <Input type="button" onClick={onClickBackModal} defaultValue="back"/>
    </Form>
  )
}