import React from 'react';
import Div from '../../../atoms/Div';

import styles from './style.module.css'

export default function Modal({
  className,
  size,
  wrapperRef,
  children,
}) {
  const classNames = [className, styles[size], "modal-bodyy", "row", 
    size === "small" ? "justify-content-center align-items-center" : "flex-column flex-nowrap"
  ];
  return (
    <Div className="modal">
      <Div
        className={classNames.join(" ")}
        ref={wrapperRef}
      >
        {children}
      </Div>
    </Div>
  )
}