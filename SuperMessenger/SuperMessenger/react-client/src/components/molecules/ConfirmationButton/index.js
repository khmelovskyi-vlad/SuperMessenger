import React from 'react';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';

import styles from './style.module.css'

export default function ConfirmationButton(props) {
  const className = [props.className, styles[props.size], "column", "row", "m-0"];
  return (
    <Div className={className.join(" ")}>
      <Input className="modal-input col-6 p-0"
        type="button"
        defaultValue="accept"
        onClick={(e) => props.onClickAccept(e, props.selectedItem)} />
      <Input className="modal-input col-6 p-0"
        type="button"
        defaultValue="decline accept"
        onClick={(e) => props.onClickDecline(e, props.selectedItem)} />
      <Input type="button" onClick={props.onClickBackModal} defaultValue="back"/>
    </Div>
  );
}