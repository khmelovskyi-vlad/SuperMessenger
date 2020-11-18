import React, {useState, useRef, useEffect} from 'react'
import Invitation from '../../Models/Invitation';
import InvitationModel from '../../Models/InvitationModel';
import CreateGroupForm from '../Molecules/CreateGroupForm'
import SimpleContent from '../Molecules/SimpleContent';
import "./Modal.css"
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
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          console.log("lol");
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function change() {
    console.log("some");
  }
  return (
    <div className="modal">
      <div className="modal-bodyy row flex-column flex-nowrap" ref={wrapperRef}>
        <h1 className="modal-title">Create group</h1>
        <CreateGroupForm
          onChangeGroupName={props.onCheckGroupName}
          canUseGroupName={props.canUseGroupName}
          onChangeSearchUsers={props.onChangeSearchUsers}
          onSubmitCreateGroup={props.onSubmitCreateGroup}
          invitations={invitations}
        />
        <div className="row m-0 flex-column flex-nowrap" style={{overflowY: "auto", overflowX: "hidden"}}>
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
                // bottomData={<LastMessageContent lastMessage={user.lastMessage}/>}
              />)
          }
        </div>
      </div>
    </div>
  )
}