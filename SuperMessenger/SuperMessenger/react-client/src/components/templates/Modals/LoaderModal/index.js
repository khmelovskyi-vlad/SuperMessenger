import React from 'react';
import Loader from '../../../molecules/Loader';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';

export default function LoaderModal(props) {
  return (
    <Modal size={ComponentSizeType.small} wrapperRef={props.wrapperRef}>
      <Loader/>
    </Modal>
  )
}