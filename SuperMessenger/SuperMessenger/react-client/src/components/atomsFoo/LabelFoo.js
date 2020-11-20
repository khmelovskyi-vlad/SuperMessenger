import React from "react"

export default function LabelFoo(props) {
    return (
      <label className="m-0" htmlFor={props.for}>
        {props.value}
      </label>
    );
}