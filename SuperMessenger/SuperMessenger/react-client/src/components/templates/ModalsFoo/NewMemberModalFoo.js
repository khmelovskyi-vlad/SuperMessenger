import React from 'react';
import Div from '../atoms/Div';
import Title from '../atoms/Title';
import SearchInformation from '../molecules/SearchInformation';
import SimpleContent from '../organisms/SimpleContent';
import "./Modal.css"
export default function NewMemberModalFoo(props) {
  return (
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">Search user</Title>
        <SearchInformation
          name="searchUser"
          value="Write email"
          onClickBackModal={props.onClickBackModal}
          onChange={props.onChangeNewMemberModal}
        />
        {/* <label className="modal-label" htmlFor="searchUser">Write email</label>
        <input className="modal-imput" type="text" name="searchUser" onChange={props.onChangeNewMemberModal}/> */}
        {/* <button className="modal-imput" onClick={props.onClickCloseModal}>close modal</button> */}
        <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
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