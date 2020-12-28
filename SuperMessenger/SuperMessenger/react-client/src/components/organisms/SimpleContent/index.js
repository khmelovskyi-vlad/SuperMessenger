import React from 'react';
import SimpleImgContent from '../../molecules/SimpleImgContent';
import Div from '../../atoms/Div';
import Span from '../../atoms/Span';
import CreatorImage from '../../molecules/CreatorImage';

import styles from './style.module.css'

export default function SimpleContent({
  size,
  simpleContentClasses,
  imgContentClasses,
  imgClasses,
  isUser,
  imageName,
  showOwner,
  isOwner,
  simpleNameClasses,
  name,
  bottomData,
  onClick,
}) {
  const classNames = [styles[size], simpleContentClasses, "column", "row", "m-1", "p-0"];
  return (
    <Div className={classNames.join(" ")}
      onClick={onClick}
    >
      <SimpleImgContent
        className={imgContentClasses}
        imgClasses={imgClasses}
        isUser={isUser}
        imageName={imageName}
      />
      <CreatorImage showOwner={showOwner} isOwner={isOwner} />
      <Div className="col-8 p-0 row flex-column m-0">
        <Span className={`${simpleNameClasses} column m-0`}>{name}</Span>
        {bottomData}
      </Div>
    </Div>
  );
}