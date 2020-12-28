import React from 'react';
import ImgPaths from '../../../Entities/Pathes/ImgPaths';
import Div from '../../atoms/Div';
import Img from '../../atoms/Img';

import styles from './style.module.css'

export default function CreatorImage({
  className,
  size,
  showOwner,
  isOwner,
}) {
  const classNames = [className, styles[size],
    "align-items-center", "justify-content-center", "d-flex", "m-0", "p-0", "col-1"]
  const imgPaths = new ImgPaths();
  const path = imgPaths.getCreatorPath();
  return (
    <Div className={classNames.join(" ")}>
      {(showOwner === true && isOwner === true) &&
        <Img src={path} alt="image" className="w-100"/>
      }
    </Div>
  );
}