import React from 'react';
import Button from '../../atoms/Button';
import Div from '../../atoms/Div';

import styles from './style.module.css'

export default function Connect({
  onLogin,
  onLogout,
  isLogin,
  className,
  size,
}) {
  const classNames = [className, styles[size], "my-2", "my-lg-0"];
  return (
    <Div  className={classNames.join(" ")}>
      { isLogin
        ? <Button id="logout" onClick={onLogout}>Logout</Button>
        : <Button id="login" onClick={onLogin}>Login</Button>}
    </Div>
  );
}