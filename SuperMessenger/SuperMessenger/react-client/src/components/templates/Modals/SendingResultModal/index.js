import React from 'react';
import useOutsideModal from '../../../../hooks/useOutsideModal';
import Input from '../../../atoms/Input';
import Title from '../../../atoms/Title';
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import Modal from '../Modal';
import "../Modal.css"



export default function SendingResultModal({
  setRenderSendingResult,
  setSendingResult,
  renderSendingResult,
  sendingResult,
}) {
  const [wrapperRef, setOpenModals] = useOutsideModal(handleClickCloseModal);


  function handleClickCloseModal(openModals) {
    setRenderSendingResult(false);
    setSendingResult("");
  };
  return (
    <>
      {
        renderSendingResult &&
        <Modal size={ComponentSizeType.medium} wrapperRef={wrapperRef}>
          <Title className="modal-title">{sendingResult}</Title>
        </Modal>
      }
    </>
  )
}