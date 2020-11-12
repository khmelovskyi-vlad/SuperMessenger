import React from 'react';
import Sup from '../Atoms/Sup';
export default function InvitationButton(props) { 
  return (
    <button className="nav-link btn" /*type="submit"*/ onClick={props.onClick}>
      <span>
        Invitations<Sup value={props.value}/>
      </span>
    </button>
  )
}