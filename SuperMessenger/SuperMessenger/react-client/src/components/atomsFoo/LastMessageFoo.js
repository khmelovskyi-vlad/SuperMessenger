import React from 'react';
import Span from './Span';
export default function LastMessageFoo(props) {
  const classList = ["m-0", "p-0", props.haveMessage ? "col-6" : "column"]
  return (
    <Span className={classList.join(" ")}>{props.value}</Span>
  );
}