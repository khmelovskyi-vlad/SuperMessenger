import React from "react"

export default function Input(props) {
    const inputProps = {
      type: props.type,
    }
    if (props.value) {
      inputProps.value = props.value;
    }
    if (props.id) {
      inputProps.id = props.id;
    }
    if (props.class) {
      inputProps.className = props.class;
    }
    if (props.name) {
      inputProps.name = props.name;
    }
    if (props.onClick) {
      inputProps.onClick = props.onClick;
    }
    if (props.onChange) {
      inputProps.onChange = props.onChange;
    }
    if (props.accept) {
      inputProps.accept = props.accept;
    }
    return (
      <input {...inputProps}/>
    )
}