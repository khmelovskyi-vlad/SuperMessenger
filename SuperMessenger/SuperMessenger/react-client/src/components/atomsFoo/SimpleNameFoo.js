import React from 'react';
import Span from './Span';
export default function SimpleNameFoo(props) {
  const classList = ["column", "m-0", props.classes]
  return (
    <Span className={classList.join(" ")}>{props.value}</Span>
  );
}