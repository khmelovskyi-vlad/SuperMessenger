import React from 'react';
import A from '../atoms/A';
import Img from '../atoms/Img';
export default function LogotypeFoo() {
  return (
    <A className="navbar-brand" href="#">
      <Img className="logotype" src="/logo.png"  alt="logo"/>
    </A>
  );
}