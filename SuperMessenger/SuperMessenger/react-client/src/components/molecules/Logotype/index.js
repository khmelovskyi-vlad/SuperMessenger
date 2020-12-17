import React from 'react';
import A from '../../atoms/A';
import Img from '../../atoms/Img';

import styles from './style.module.css'

export default function Logotype() {
  const className = [props.className, styles[props.size], "navbar-brand"];
  return (
    <A className={className.join(" ")} href="#">
      <Img className="logotype" src="/logo.png"  alt="logo"/>
    </A>
  );
}