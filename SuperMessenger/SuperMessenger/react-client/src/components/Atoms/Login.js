import React from 'react';
export default function Login (props) {
  return (
    <button
      id="login"
      onClick={() => props.userManager.signinRedirect()}>
      Login
    </button>
  );
}