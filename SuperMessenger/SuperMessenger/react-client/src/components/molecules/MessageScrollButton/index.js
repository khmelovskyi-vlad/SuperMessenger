import React from 'react'
import Button from '../../atoms/Button';
import Img from '../../atoms/Img'
import ImgPaths from '../../../Entities/Pathes/ImgPaths';

import styles from './style.module.css'

export default function MessageScrollButton({
  className,
  size,
  onClick,
}) {
  const classNames = [className, styles[size], styles["messageScrollButton"], "w-md-25"]
  const imgPaths = new ImgPaths();
  return (
    <Button className={classNames.join(" ")} onClick={onClick} >
      <Img src={imgPaths.getScrollPath()} className="w-100"/>
    </Button>
  )
}