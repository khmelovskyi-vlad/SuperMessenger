import React from 'react';
import SimpleImgContent from '../../molecules/SimpleImgContent';
import Div from '../../atoms/Div';
import Span from '../../atoms/Span';
import CreatorImage from '../../molecules/CreatorImage';

import styles from './style.module.css'

export default function SimpleContent(props) {
  const className = [styles[props.size], props.simpleContentClasses, "column", "row", "m-1", "p-0"];
  return (
    <Div className={className.join(" ")}
      onClick={props.onClickSelectId ? () => props.onClickSelectId(props.id) :
      props.onClickSelectUser ? () => props.onClickSelectUser(props.user) :
      props.onClickSelectInvitation ? () => props.onClickSelectInvitation(props.invitation) :
      props.onClickSelectApplication ? () => props.onClickSelectApplication(props.application) : null}
    >
      <SimpleImgContent
        classes={props.imgContentClasses}
        imgClasses={props.imgClasses}
        imageName={props.imageName}
        isUser={props.isUser}
      />
        <CreatorImage showOwner={props.showOwner} isOwner={props.isOwner} />
      <Div className="col-8 p-0 row flex-column m-0">
        <Span className={`${props.simpleNameClasses} column m-0`}>{props.name}</Span>
        {props.bottomData}
      </Div>
    </Div>
  );
}