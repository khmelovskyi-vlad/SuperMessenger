import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import SimpleContentContainer from '../../../../containers/SimpleContentContainer';
import SearchInformation from '../../../molecules/SearchInformation';
import ComponentSizeType from '../../../../containers/Enums/ComponentSizeType';
import Modal from '../Modal';



export default function SearchGroupToApplicationModal (props) {
  return (
    <Modal size={ComponentSizeType.medium} wrapperRef={props.wrapperRef}>
      <Title className="modal-title">Search group</Title>
      <SearchInformation
        name="searchGroup"
        value="Write name"
        onClickBackModal={props.onClickBackModal} 
        onChange={props.onChangeSearchGroupToApplicationModal}
      />
      <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
        {
          props.foundGroups && props.foundGroups.map(group =>
            <SimpleContentContainer
              onClickSelectId={props.onClickSelectedGroupModal}
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