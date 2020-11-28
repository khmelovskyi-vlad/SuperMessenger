import React from 'react';
import Button from '../atoms/Button';
import Span from '../atoms/Span';
import Sup from '../atoms/Sup';
export default function NavbarButton(props) { 
  return (
    <Button
      className="nav-link btn" /*type="submit"*/
      onClick={props.type==="acceptApplication" ? () => props.onClick(props.applications) : props.onClick}>
      <Span>
        {props.title}{props.showSup&&<Sup children={props.value}/>}
      </Span>
    </Button>
  )
}