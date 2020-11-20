import React from 'react';
import Button from './Button';
export default function LogoutFoo (props) {
  return (
    <Button
      id="logout"
      onClick={() => props.userManager.signoutRedirect()}>
      Logout
    </Button>
  );
}