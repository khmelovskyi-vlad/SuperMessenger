import React from 'react';
import SimpleContent from '../../components/organisms/SimpleContent';



export default function SimpleContentContainer({
  size,
  onClickSelectId,
  onClickSelectUser,
  onClickSelectInvitation,
  onClickSelectApplication,
  id,
  user,
  invitation,
  application,
  simpleContentClasses,
  imgContentClasses,
  imgClasses,
  isUser,
  imageName,
  showOwner,
  isOwner,
  simpleNameClasses,
  name,
  bottomData,
}) {
  function handleClick(){
    const func = onClickSelectId ? () => onClickSelectId(id) :
      onClickSelectUser ? () => onClickSelectUser(user) :
        onClickSelectInvitation ? () => onClickSelectInvitation(invitation) :
          onClickSelectApplication ? () => onClickSelectApplication(application) : null;
    if (func != null) {
      func(); 
    }
  }
  return (
    <SimpleContent
      simpleContentClasses={simpleContentClasses}
      size={size}
      imgContentClasses={imgContentClasses}
      imgClasses={imgClasses}
      isUser={isUser}
      imageName={imageName}
      showOwner={showOwner}
      isOwner={isOwner}
      simpleNameClasses={simpleNameClasses}
      name={name}
      bottomData={bottomData}
      onClick={handleClick}
    />
  );
}