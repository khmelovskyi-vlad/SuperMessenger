import React from 'react'
import Div from '../atoms/Div'
import Title from '../atoms/Title'
import SearchInformation from '../molecules/SearchInformation'
import SimpleContent from '../molecules/SimpleContent'
import "./Modal.css"
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
        {/* <label className="modal-label" htmlFor="searchUser">Write email</label>
        <input className="modal-imput" type="text" name="searchUser" onChange={props.onChangeNewMemberModal}/> */}
        {/* <button className="modal-imput" onClick={props.onClickCloseModal}>close modal</button> */}
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
                imageId={group.imageId}
                name={group.name}
              />)
            // props.groups && foreach(group in props.groups){
            //   <SimpleGroupContent group={group}/>
            // }
          }
        </Div>
      </Div>
    </Div>
  )
}