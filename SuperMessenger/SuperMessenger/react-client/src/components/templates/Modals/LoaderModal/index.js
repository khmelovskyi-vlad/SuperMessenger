import React from 'react';
import Div from '../../../atoms/Div';
import Loader from '../../../molecules/Loader';
import "../Modal.css"
export default function LoaderModal(props) {
  return (
    <Div className="modal">
      <Div className="modal-bodyy row justify-content-center align-items-center" ref={props.wrapperRef}>
        <Loader/>
      </Div>
    </Div>
  )
}