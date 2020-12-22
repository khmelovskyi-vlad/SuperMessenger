import React from 'react';
import GroupType from '../../../containers/Enums/GroupType';
import Div from '../../atoms/Div';
import Span from '../../atoms/Span';

import styles from './style.module.css'

export default function ChatName(props) {
  const className = [props.className, styles[props.size], "column", "m-0", "p-0", "row", "flex-column"];
  return (
    <Div className={className.join(" ")}>
      <Span className="column m-0">{props.group.name}</Span>
      {props.group.type === GroupType.chat ? null
        : <Span className="column m-0">{props.group.usersInGroup.length}</Span>}
    </Div>
  );
}