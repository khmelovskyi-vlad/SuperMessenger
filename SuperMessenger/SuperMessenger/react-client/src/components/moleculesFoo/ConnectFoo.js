import React from 'react';
import Button from '../atoms/Button';
import Div from '../atoms/Div';
export default function ConnectFoo(props) {
  return (
    <Div className="my-2 my-lg-0">
      { props.isLogin
        ? <Button id="logout" onClick={() => props.userManager.signoutRedirect()}> Logout </Button>
        : <Button id="login" onClick={() => props.userManager.signinRedirect()}>Login</Button>}
    </Div>
  );
}