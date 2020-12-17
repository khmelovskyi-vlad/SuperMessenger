import React from 'react';
import ImgPaths from '../../../containers/Pathes/ImgPaths';
import A from '../../atoms/A';
import Img from '../../atoms/Img';

import styles from './style.module.css'

export default function Logotype(props) {
  const className = [props.className, styles[props.size], "navbar-brand"];
  const imgPaths = new ImgPaths();
  return (
    <A className={className.join(" ")} href="#">
      <Img className="logotype" src={imgPaths.getLogoPath()} alt="logo"/>
    </A>
  );
}