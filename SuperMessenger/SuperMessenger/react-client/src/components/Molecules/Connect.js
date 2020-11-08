import React from 'react';
import Login from '../Atoms/Login';
import Logout from '../Atoms/Logout';
export default function Connect(props) {
  return (
    <div className="my-2 my-lg-0">
      { props.isLogin ? <Logout userManager={props.userManager}/> : <Login userManager={props.userManager} /> }
    </div>
  );
}