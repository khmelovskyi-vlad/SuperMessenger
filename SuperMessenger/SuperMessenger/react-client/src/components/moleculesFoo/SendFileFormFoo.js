import React from 'react';
import ImgPaths from '../../ImgPaths';
import Img from '../atoms/Img';
import Form from '../atoms/Form';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
export default function SendFileFormFoo(props) {
  const imgPaths = new ImgPaths();
  return (
    <Form className="col-3 p-0 m-0 h-25 row align-items-start"
      onSubmit={(e) => props.onSubmitSendFiles(e, props.createFileModel())}
    >
      <Label className="m-0 h-25" htmlFor="file-input">
        <Img className="sendFileButton mx-1 column p-0" src={imgPaths.join(imgPaths.imgs, "sendFileButton.png")} alt="select file"/>
      </Label>
      <Input id="file-input" onChange={props.onChange} type="file" style={{display: "none"}} />
      {/* <input type="submit"/> */}
    </Form>
  );
}