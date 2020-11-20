import React from 'react';
import Button from './Button';
export default function LoginFoo (props) {
  return (
    <Button
      id="login"
      onClick={() => props.userManager.signinRedirect()}
    >
      Login
    </Button>
  );
}