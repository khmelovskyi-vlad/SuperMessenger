import React from 'react';
export default function SimpleName(props) {
  const classList = ["column", "m-0", props.classes]
  return (
    <p className={classList.join(" ")}>{props.value}</p>
  );
}