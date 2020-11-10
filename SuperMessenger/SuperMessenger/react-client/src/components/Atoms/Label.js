import React from "react"

export default function Label(props) {
    return (
      <label className="m-0" htmlFor={props.for}>
        {props.value}
      </label>
    );
}