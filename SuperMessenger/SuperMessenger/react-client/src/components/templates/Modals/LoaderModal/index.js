import React from 'react';
import useOutsideModal from '../../../../hooks/useOutsideModal';
import Loader from '../../../molecules/Loader';
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import Modal from '../Modal';

export default function LoaderModal({
  setRenderLoader,
  renderLoader,
}) {
  const [wrapperRef, setOpenModals] = useOutsideModal(handleClickCloseModal);


  function handleClickCloseModal(openModals) {
      setRenderLoader(false);
  };
  return (
    <>
      {
        renderLoader &&
        <Modal size={ComponentSizeType.small} wrapperRef={wrapperRef}>
          <Loader/>
        </Modal>
      }
    </>
  )
}