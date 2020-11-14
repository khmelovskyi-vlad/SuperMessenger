import React from 'react';
import Sup from '../Atoms/Sup';
export default function NavbarButton(props) { 
  return (
    <button className="nav-link btn" /*type="submit"*/ onClick={props.onClick}>
      <span>
        {props.type}{props.showSup&&<Sup value={props.value}/>}
      </span>
    </button>
  )
}