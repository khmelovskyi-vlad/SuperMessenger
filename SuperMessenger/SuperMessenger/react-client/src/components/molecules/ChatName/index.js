import React from 'react';
import GroupType from '../../../containers/Enums/GroupType';
import Div from '../../atoms/Div';
import Span from '../../atoms/Span';

import styles from './style.module.css'

export default function ChatName(props) {
  return (
    <Div className="column m-0 p-0 row flex-column">
      {props.group.type === GroupType.chat
        ? <Span className="column m-0">{props.group.usersInGroup[0].id === props.myId
          ? props.group.usersInGroup[1].id
          : props.group.usersInGroup[0].id}</Span>
        :
        <>
          <Span className="column m-0">{props.group.name}</Span>
          <Span className="column m-0">{props.group.usersInGroup.length}</Span>
        </>}
    </Div>
  );
}