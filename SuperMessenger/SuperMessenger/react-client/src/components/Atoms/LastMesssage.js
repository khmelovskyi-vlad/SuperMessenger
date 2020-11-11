import React from 'react';
export default function LastMesssage(props) {
  const classList = ["m-0", "p-0", props.haveMessage ? "col-6" : "column"]
  return (
    <span className={classList.join(" ")}>{props.value}</span>
  );
}