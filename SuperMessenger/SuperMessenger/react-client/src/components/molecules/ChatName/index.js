import React from 'react';
import GroupType from '../../../Entities/Enums/GroupType';
import Div from '../../atoms/Div';
import Span from '../../atoms/Span';

import styles from './style.module.css'

export default function ChatName({
  className,
  size,
  group,
}) {
  const classNames = [className, styles[size], "column", "m-0", "p-0", "row", "flex-column"];
  return (
    <Div className={classNames.join(" ")}>
      <Span className="column m-0">{group.name}</Span>
      {group.type === GroupType.chat ? null
        : <Span className="column m-0">{group.usersInGroup.length}</Span>}
    </Div>
  );
}