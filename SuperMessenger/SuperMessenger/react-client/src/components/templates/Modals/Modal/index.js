import React from 'react';
import Div from '../../../atoms/Div';

import styles from './style.module.css'

export default function Modal(props) {
  const className = [props.className, "modal-bodyy", "row", 
    props.size === "small" ? "justify-content-center align-items-center" : "flex-column flex-nowrap"
  ];
  return (
    <Div className="modal">
      <Div
        className={className.join(" ")}
        ref={props.wrapperRef}
      >
        {props.children}
      </Div>
    </Div>
  )
}