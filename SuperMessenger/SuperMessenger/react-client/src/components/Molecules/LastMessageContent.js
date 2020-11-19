import React from 'react';
import CreatorDate from '../../CreatorDate';
import LastMessage from '../Atoms/LastMessage';

export default function LastMessageContent(props) {
  return (
    <div className="column m-0 row justify-content-between">
      {props.lastMessage.value ?
        <>
          {/* <LastMessage value="value"/> */}
          <LastMessage value={props.lastMessage.value} haveMessage={true}/>
          {/* <LastMessage value="sendDate"/> */}
          <LastMessage
            // value={`${props.lastMessage.sendDate.getHours()}:${props.lastMessage.sendDate.getMinutes()}`}
            value={CreatorDate.createStringDate(props.lastMessage.sendDate)}
            haveMessage={true}
          />
        </>
        :
          <LastMessage value="don't have messages"  haveMessage={false}/>}
    </div>
  );
}