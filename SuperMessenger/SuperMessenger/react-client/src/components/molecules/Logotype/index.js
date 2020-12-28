import React from 'react';
import ImgPaths from '../../../Entities/Pathes/ImgPaths';
import A from '../../atoms/A';
import Img from '../../atoms/Img';

import styles from './style.module.css'

export default function Logotype({
  className,
  size,
}) {
  const classNames = [className, styles[size], "navbar-brand"];
  const imgPaths = new ImgPaths();
  return (
    <A className={classNames.join(" ")} href="#">
      <Img className="logotype" src={imgPaths.getLogoPath()} alt="logo"/>
    </A>
  );
}