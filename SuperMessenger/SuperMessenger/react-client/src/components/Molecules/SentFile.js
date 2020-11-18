import React from 'react'
import MessageSub from '../Atoms/MessageSub'
export default function SentFile(props) {
  const classList = ["column", "p-1", props.isMyMessage ? "myMessage" : "noMyMessage"]
  function handleOnClickDownloadFile() {
    window.location.replace(`/api/SentFiles?groupId=${props.groupId}&fileId=${props.id}`);
  }
  return (
    <button className={classList.join(" ")} onClick={() => handleOnClickDownloadFile()}>
      {props.name}
      <MessageSub date={props.date}/>
    </button>
  )
}