import React from 'react';
import CreatorDate from '../../../Services/CreatorDate';
import Div from '../../atoms/Div';
import Span from '../../atoms/Span';

import styles from './style.module.css'

export default function LastMessage({
  className,
  size,
  lastMessage,
}) {
  const classNames = [className, styles[size], "column", "row", "m-0", "justify-content-between"];
  return (
    <Div className={classNames.join(" ")}>
      {lastMessage ?
        <>
          <Span className="m-0 p-0 col-6">{lastMessage.value ?? lastMessage.name  }</Span>
          <Span className="m-0 p-0 col-6">{CreatorDate.createStringDate(lastMessage.sendDate)}</Span>
        </>
        :
          <Span className="m-0 p-0 column">don't have messages</Span>}
    </Div>
  );
}