import React from 'react'
import Button from '../../atoms/Button';
import Img from '../../atoms/Img'
import ImgPaths from '../../../containers/Pathes/ImgPaths';

import styles from './style.module.css'

export default function MessageScrollButton(props) {
  const className = [props.className, styles[props.size], styles["messageScrollButton"], "w-md-25"]
  const imgPaths = new ImgPaths();
  return (
    <Button className={className.join(" ")} onClick={props.onClick} >
      <Img src={imgPaths.getScrollPath()} className="w-100"/>
    </Button>
  )
}