import React from 'react';
import Title from '../../../atoms/Title';
import Span from '../../../atoms/Span';
import SimpleContent from '../../../organisms/SimpleContent';
import ConfirmationButton from '../../../molecules/ConfirmationButton';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';



export default function AcceptApplicationModal(props) {
  //m-0
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">Accept application</Title>
      <SimpleContent
        onClickSelectUser={props.onClickCloseModal}
        user={props.selectedApplication.user}
        id={props.selectedApplication.user.id}
        key={props.selectedApplication.user.id}
        simpleContentClasses="foo"
        imgContentClasses=""
        imgClasses="mw-100" 
        simpleNameClasses="simpleName"
        isUser={true}
        imageName={props.selectedApplication.user.imageName}
        name={props.selectedApplication.user.email}
        bottomData=
        {<Span
          className="column m-0 p-0 text-wrap"
          style={{ wordBreak: "break-all" }}
        >
          {props.selectedApplication.value}
        </Span>}
      />
      <ConfirmationButton
        selectedItem={props.selectedApplication}
        onClickAccept={props.onClickAccept}
        onClickDecline={props.onClickDecline}
        onClickBackModal={props.onClickBackModal}
      />
    </Modal>
  )
}