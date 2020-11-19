import React from 'react'
import SearchNoMyGroup from '../Molecules/SearchNoMyGroup'
import SimpleContent from '../Molecules/SimpleContent'
import "./Modal.css"
export default function SearchGroupToApplicationModal (props) {
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <h1 className="modal-title">Search group</h1>
        <SearchNoMyGroup
          onClickBackModal={props.onClickBackModal} 
          onChange={props.onChangeSearchGroupToApplicationModal}
        />
        {/* <label className="modal-label" htmlFor="searchUser">Write email</label>
        <input className="modal-imput" type="text" name="searchUser" onChange={props.onChangeNewMemberModal}/> */}
        {/* <button className="modal-imput" onClick={props.onClickCloseModal}>close modal</button> */}
        <div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
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
                // bottomData={<LastMessageContent lastMessage={user.lastMessage}/>}
              />)
            // props.groups && foreach(group in props.groups){
            //   <SimpleGroupContent group={group}/>
            // }
          }
        </div>
      </div>
    </div>
  )
}