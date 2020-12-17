import React from 'react';
import ImgPaths from '../../../containers/Pathes/ImgPaths';
import Div from '../../atoms/Div';
import Img from '../../atoms/Img';

import styles from './style.module.css'

export default function CreatorImage(props) {
  const className = [props.className, styles[props.size],
    "align-items-center", "justify-content-center", "d-flex", "m-0", "p-0", "column", props.classes]
  const imgPaths = new ImgPaths();
  const path = imgPaths.getCreatorPath();
  return (
    <Div className={className.join(" ")}>
      <Img src={path} alt="image" className="w-100"/>
    </Div>
  );
}