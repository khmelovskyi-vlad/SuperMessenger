import React, {useState} from 'react';
import Div from '../../../atoms/Div';
import Title from '../../../atoms/Title';
import Invitation from '../../../../containers/Models/Invitation';
import CreateGroupForm from '../../../organisms/CreateGroupForm';
import SimpleContent from '../../../organisms/SimpleContent';
// import "./Modal.css"


import styles from './style.module.css'

export default function CreateGroupModal(props) {
  const [invitations, setInvitations] = useState([]);
  function handleClickSelectedUser(user) {
    // setInvitations(prevInviations => {
    //     prevInviations.push(new Invitation(undefined, undefined, undefined, user, props.simpleMe));
    //     return {...prevInviations};
    //   }
    // )
    setInvitations(prevInviations => [...prevInviations, new Invitation(undefined, undefined, undefined, user, props.simpleMe)])
  }

  return (
    <Div className="modal">
      <Div className="modal-bodyy row flex-column flex-nowrap" ref={props.wrapperRef}>
        <Title className="modal-title">Create group</Title>
        <CreateGroupForm
          onClickBackModal={props.onClickBackModal}
          onChangeGroupName={props.onCheckGroupName}
          canUseGroupName={props.canUseGroupName}
          onChangeSearchUsers={props.onChangeSearchUsers}
          onSubmitCreateGroup={props.onSubmitCreateGroup}
          invitations={invitations}
        />
        <Div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
          {
            props.foundUsers && props.foundUsers.map(user =>
              <SimpleContent
                // selectedGroupOnClick={props.onClickCloseModal}
                onClickSelectUser={handleClickSelectedUser}
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
          }
        </Div>
      </Div>
    </Div>
  )
}