import React, { Fragment, useState } from 'react';
import NewMemberModalForm from '../Molecules/NewMemberModalForm';
import SimpleGroupContent from '../Molecules/SimpleGroupContent';
import "./Modal.css"
export default function NewMemberModal(props) {
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap">
        <h1 className="modal-title">Search user</h1>
        <NewMemberModalForm onChange={props.onChangeNewMemberModal}/>
        {/* <label className="modal-label" htmlFor="searchUser">Write email</label>
        <input className="modal-imput" type="text" name="searchUser" onChange={props.onChangeNewMemberModal}/> */}
        {/* <button className="modal-imput" onClick={props.onClickCloseModal}>close modal</button> */}
        <div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
          {
            props.foundUsers && props.foundUsers.map(user =>
              <SimpleGroupContent
                // selectedGroupOnClick={props.onClickCloseModal}
                selectedUserOnClick={props.onClickCloseModal}
                user={user}
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
    </div>
  )
}