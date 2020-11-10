import React from 'react';
import SimpleImg from '../Atoms/SimpleImg';
import SimpleName from '../Atoms/SimpleName';
import SimpleImgContent from './SimpleImgContent';
export default function Members(props) {
  return (
    <div className="column row m-1 p-0 flex-column">
      {
        props.isCreator &&
        <input className="column" type="button" defaultValue="add new member" onClick={props.onClickNewMember} />
      }
      <div className="column simpleGroupContent row m-1 p-0">
        <SimpleImgContent imgClasses={"simpleImg"} imageId={props.imageId}/>
        <div className="col-8 p-0 row flex-column m-0">
          <SimpleName value={props.groupName} classes="simpleName"/>
        </div>
      </div>
    </div>
  );
}