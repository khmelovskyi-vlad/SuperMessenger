import React from 'react';
export default function Sup(props) { 
  return (
    <sup style={{backgroundColor: "#4171D4", border: "2px", borderRadius: "20px"}}>
      {props.value}
   </sup> 
  )
}