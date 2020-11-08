import React from 'react';
export default function Avatar(props) {
  return (
    <li className="nav-item">
      <img src={`/avatars/${props.imageId}.jpg`} alt="avatar" width="23"  />
    </li>
  );
}