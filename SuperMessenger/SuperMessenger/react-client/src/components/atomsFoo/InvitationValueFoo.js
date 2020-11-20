import React from 'react'
import Span from './Span'
export default function InvitationValueFoo(props) {
  return (
      <Span className="column m-0 p-0 text-wrap" style={{wordBreak: "break-all"}}>{props.value}</Span>
  )
}
