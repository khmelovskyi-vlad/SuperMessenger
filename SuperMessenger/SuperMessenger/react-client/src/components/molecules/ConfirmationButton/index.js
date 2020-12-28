import React from 'react';
import Div from '../../atoms/Div';
import Input from '../../atoms/Input';

import styles from './style.module.css'

export default function ConfirmationButton({
  className,
  size,
  onClickAccept,
  onClickDecline,
  selectedItem,
}) {
  const classNames = [className, styles[size], "column", "row", "m-0"];
  return (
    <Div className={classNames.join(" ")}>
      <Input className="modal-input col-6 p-0"
        type="button"
        defaultValue="accept"
        onClick={(e) => onClickAccept(e, selectedItem)} />
      <Input className="modal-input col-6 p-0"
        type="button"
        defaultValue="decline accept"
        onClick={(e) => onClickDecline(e, selectedItem)} />
    </Div>
  );
}