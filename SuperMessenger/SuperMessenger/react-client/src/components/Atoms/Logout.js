import React from 'react';
export default function Logout (props) {
  return (
    <button
      id="logout"
      onClick={() => props.userManager.signoutRedirect()}>
      Logout
    </button>
  );
}