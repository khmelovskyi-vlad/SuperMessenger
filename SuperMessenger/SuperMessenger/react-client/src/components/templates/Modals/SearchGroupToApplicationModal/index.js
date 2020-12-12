import React from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import SimpleContent from '../../../organisms/SimpleContent';
import SearchInformation from '../../../molecules/SearchInformation';
// import "./Modal.css"


import styles from './style.module.css'

export default function SearchGroupToApplicationModal (props) {
  return (
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
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
              <SimpleContent
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
      </Div>
    </Div>
  )
}