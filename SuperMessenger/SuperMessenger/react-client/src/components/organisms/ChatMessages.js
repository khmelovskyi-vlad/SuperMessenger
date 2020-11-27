import React from 'react';
import Div from '../atoms/Div';
import ChatMessage from '../molecules/ChatMessage';
export default function ChatMessages(props) {
  // const messagesSentFiles = createMessagesSentFiles();
  // const messagesSentFiles = useRef(createMessagesSentFiles());
  // const [messagesSentFiles, setMessagesSentFiles] = useState(() => createMessagesSentFiles());
  function createMessagesSentFiles() {
    if (props.messages && props.sentFiles && props.messages.length > 0 && props.sentFiles.length > 0) {
      return props.messages.concat(props.sentFiles);
    } else if (props.messages) {
      return props.messages;
    } else {
      return props.sentFiles;
    }
  }
  return (
    <Div className="column p-0 m-0"
      style={{ overflowY: "auto", overflowX: "hidden" }}>
      {
        (props.messages || props.sentFiles) &&
        createMessagesSentFiles().sort((a, b) => a.sendDate - b.sendDate).map(data =>
          <ChatMessage
            key={data.id}
            data={data}
            myId={props.myId}
            isConfirmed={data.isConfirmed}
          />)
      }
      {/* {
        props.messages &&
        props.messages.sort((a, b) => a.sendDate - b.sendDate).map(message =>
          <ChatMessage
            key={message.id}
            message={message}
            myId={props.myId}
          />)
      } */}
    </Div>
  );
}