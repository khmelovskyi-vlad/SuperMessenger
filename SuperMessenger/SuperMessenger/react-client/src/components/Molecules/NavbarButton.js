import React from 'react';
import Sup from '../Atoms/Sup';
export default function NavbarButton(props) { 
  return (
    <button
      className="nav-link btn" /*type="submit"*/
      onClick={props.type==="acceptApplication" ? () => props.onClick(props.applications) : props.onClick}>
      <span>
        {props.title}{props.showSup&&<Sup value={props.value}/>}
      </span>
    </button>
  )
}