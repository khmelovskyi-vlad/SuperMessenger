import React from 'react';
import NewMemberModalForm from '../Molecules/NewMemberModalForm';
import SimpleContent from '../Molecules/SimpleContent';
import "./Modal.css"
export default function NewMemberModal(props) {
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <h1 className="modal-title">Search user</h1>
        <NewMemberModalForm
          onClickBackModal={props.onClickBackModal}
          onChange={props.onChangeNewMemberModal}
        />
        {/* <label className="modal-label" htmlFor="searchUser">Write email</label>
        <input className="modal-imput" type="text" name="searchUser" onChange={props.onChangeNewMemberModal}/> */}
        {/* <button className="modal-imput" onClick={props.onClickCloseModal}>close modal</button> */}
        <div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
          {
            props.foundUsers && props.foundUsers.map(user =>
              <SimpleContent
                // selectedGroupOnClick={props.onClickCloseModal}
                onClickSelectUser={props.onClickSelectedUser}
                user={user}
                id={user.id}
                key={user.id}
                simpleContentClasses="simpleGroupContent"
                imgContentClasses="simpleImgContent"
                imgClasses="simpleImg" 
                simpleNameClasses="simpleName"
                isUser={true}
                imageId={user.imageId}
                name={user.email}
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