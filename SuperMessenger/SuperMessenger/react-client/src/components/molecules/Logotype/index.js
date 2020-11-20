import React from 'react';
import A from '../../atoms/A';
import Img from '../../atoms/Img';

import styles from './style.module.css'

export default function Logotype() {
  return (
    <A className="navbar-brand" href="#">
      <Img className="logotype" src="/logo.png"  alt="logo"/>
    </A>
  );
}