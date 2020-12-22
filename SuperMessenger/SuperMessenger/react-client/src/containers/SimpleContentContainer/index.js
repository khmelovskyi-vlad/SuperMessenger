import React from 'react';
import SimpleContent from '../../components/organisms/SimpleContent';



export default function SimpleContentContainer(props) {
  function handleClick(){
    const func = props.onClickSelectId ? () => props.onClickSelectId(props.id) :
      props.onClickSelectUser ? () => props.onClickSelectUser(props.user) :
        props.onClickSelectInvitation ? () => props.onClickSelectInvitation(props.invitation) :
          props.onClickSelectApplication ? () => props.onClickSelectApplication(props.application) : null;
    if (func != null) {
      func(); 
    }
  }
  return (
    <SimpleContent
      simpleContentClasses={props.simpleContentClasses}
      size={props.size}
      imgContentClasses={props.imgContentClasses}
      imgClasses={props.imgClasses}
      isUser={props.isUser}
      imageName={props.imageName}
      showOwner={props.showOwner}
      isOwner={props.isOwner}
      simpleNameClasses={props.simpleNameClasses}
      name={props.name}
      bottomData={props.bottomData}
      onClick={handleClick}
    />
  );
}