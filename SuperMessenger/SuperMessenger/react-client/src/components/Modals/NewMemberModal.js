import React, { Fragment, useState } from 'react';
import SimpleGroupContent from '../Molecules/SimpleGroupContent';
import "./Modal.css"
export default function NewMemberModal(props) {
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap">
        <h1 className="modal-title text-wrap text-break">Search user</h1>
        <label htmlFor="searchUser">Write email</label>
        <input type="text" name="searchUser" onChange={props.onChangeNewMemberModal}/>
        <button onClick={props.onClickCloseModal}>close modal</button>
        
        {
          props.foundUsers && props.foundUsers.map(user =>
            <SimpleGroupContent
              // selectedGroupOnClick={props.selectedGroupOnClick}
              groupId={user.id}
              key={user.id}
              groupContentClasses="simpleGroupContent"
              imgContentClasses="simpleImgContent"
              imgClasses="simpleImg" 
              simpleNameClasses="simpleName"
              isUser={true}
              imageId={user.imageId}
              name={user.email}
              // bottomData={<LastMesssageContent lastMesssage={user.lastMesssage}/>}
            />)
          // props.groups && foreach(group in props.groups){
          //   <SimpleGroupContent group={group}/>
          // }
        }
      </div>
    </div>
  )
}