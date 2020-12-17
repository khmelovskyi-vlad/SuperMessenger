import React from 'react';
import Button from '../../atoms/Button';
import Div from '../../atoms/Div';

import styles from './style.module.css'

export default function Connect(props) {
  const className = [props.className, styles[props.size], "my-2", "my-lg-0"];
  return (
    <Div  className={className.join(" ")}>
      { props.isLogin
        ? <Button id="logout" onClick={() => props.userManager.signoutRedirect()}>Logout</Button>
        : <Button id="login" onClick={() => props.userManager.signinRedirect()}>Login</Button>}
    </Div>
  );
}