import React from 'react';
import ImgPaths from '../../../containers/Pathes/ImgPaths';
import Img from '../../atoms/Img';
import Label from '../../atoms/Label';
import Input from '../../atoms/Input';

import styles from './style.module.css'
import Div from '../../atoms/Div';

export default function SendFileForm(props) {
  const className = [props.className, styles[props.size], "col-3", "p-0", "m-0", "h-25", "row", "align-items-start"];
  const imgPaths = new ImgPaths();
  return (
    <Div className={className.join(" ")}>
      <Label className="m-0 h-25" htmlFor="file-input">
        <Img className="sendFileButton mx-1 column p-0" src={imgPaths.getSendFileButtonPath()} alt="select file"/>
      </Label>
      <Input id="file-input" onChange={props.onChange} type="file" style={{display: "none"}} multiple />
    </Div>
  );
}