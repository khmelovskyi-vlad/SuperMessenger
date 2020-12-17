import React from 'react';
import CreatorDate from '../../../containers/CreatorDate';
import Div from '../../atoms/Div';
import Span from '../../atoms/Span';

import styles from './style.module.css'

export default function LastMessage(props) {
  const className = [props.className, styles[props.size], "column", "row", "m-0", "justify-content-between"];
  return (
    <Div className={className.join(" ")}>
      {props.lastMessage ?
        <>
          <Span className="m-0 p-0 col-6">{props.lastMessage.value ?? props.lastMessage.name  }</Span>
          <Span className="m-0 p-0 col-6">{CreatorDate.createStringDate(props.lastMessage.sendDate)}</Span>
        </>
        :
          <Span className="m-0 p-0 column">don't have messages</Span>}
    </Div>
  );
}