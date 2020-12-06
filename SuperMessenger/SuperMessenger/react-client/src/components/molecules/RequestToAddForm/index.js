import React from 'react';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';
import Label from '../../atoms/Label';
import Textarea from '../../atoms/Textarea';
// import "../../Modals/Modal.css"

import styles from './style.module.css'

export default function RequestToAddForm(props) {
  return (
    <Form className="row m-0 flex-column" onSubmit={(e) => props.onSubmit(e, props.create())}>
      <Label className="modal-label" htmlFor={props.name}>{props.labelValue}</Label>
      <Textarea
        className="modal-textarea"
        rows="4"
        maxLength="150"
        type="text"
        name={props.name}
        onChange={props.onChange}
      />
      <Input className="modal-input" type="submit" value={props.inputValue}/>
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
    </Form>
  )
}