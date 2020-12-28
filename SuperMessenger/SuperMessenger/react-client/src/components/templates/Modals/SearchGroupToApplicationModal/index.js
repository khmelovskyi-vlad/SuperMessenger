import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import SimpleContentContainer from '../../../../containers/SimpleContentContainer';
import SearchInformation from '../../../molecules/SearchInformation';
import ComponentSizeType from '../../../../Entities/Enums/ComponentSizeType';
import Modal from '../Modal';



export default function SearchGroupToApplicationModal({
  wrapperRef,
  onClickBackModal,
  onChangeSearchGroupToApplicationModal,
  foundGroups,
  onClickSelectedGroupId,
}) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={wrapperRef}>
      <Title className="modal-title">Search group</Title>
      <SearchInformation
        name="searchGroup"
        value="Write name"
        onClickBackModal={onClickBackModal} 
        onChange={onChangeSearchGroupToApplicationModal}
      />
      <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
        {
          foundGroups && foundGroups.map(group =>
            <SimpleContentContainer
              onClickSelectId={onClickSelectedGroupId}
              id={group.id}
              key={group.id}
              simpleContentClasses="simpleGroupContent"
              imgContentClasses="simpleImgContent"
              imgClasses="simpleImg" 
              simpleNameClasses="simpleName"
              isUser={false}
              imageName={group.imageName}
              name={group.name}
            />)
        }
      </Div>
    </Modal>
  )
}