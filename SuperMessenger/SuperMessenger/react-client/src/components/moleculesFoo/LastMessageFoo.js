import React from 'react';
import CreatorDate from '../../CreatorDate';
import Div from '../atoms/Div';
import Span from '../atoms/Span';

export default function LastMessageFoo(props) {
  return (
    <Div className="column m-0 row justify-content-between">
      {props.lastMessage.value ?
        <>
          <Span className="m-0 p-0 col-6">{props.lastMessage.value}</Span>
          <Span className="m-0 p-0 col-6">{CreatorDate.createStringDate(props.lastMessage.sendDate)}</Span>
        </>
        :
          <Span className="m-0 p-0 column">don't have messages</Span>}
    </Div>
  );
}