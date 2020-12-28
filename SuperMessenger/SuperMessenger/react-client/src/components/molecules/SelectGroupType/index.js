import React from 'react';
import GroupType from '../../../Entities/Enums/GroupType';
import Option from '../../atoms/Option';
import Select from '../../atoms/Select';

import styles from './style.module.css'

export default function SelectGroupType({
  className,
  size,
  onChange,
}){
  const classNames = [className, styles[size]];
  return (
    <Select className={classNames.join(" ")} onChange={onChange}>
      <Option value={GroupType.public} children="public"/>
      <Option value={GroupType.private} children="private"/>
      <Option value={GroupType.chat} children="chat"/>
    </Select>
  )
}