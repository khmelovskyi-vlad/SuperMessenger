import React from 'react';
import Logotype from '../Atoms/Logotype';
import Connect from '../Molecules/Connect';
import SearchData from '../Atoms/SearchData';
import Avatar from '../Atoms/Avatar';
export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor:"#34AEFF"}}>
      <Logotype />
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li>
          {
            props.mainPageData.imageId &&
            <Avatar imageId={props.mainPageData.imageId}/>
          }
          {/* <li className="nav-item">
            <Connect isLogin={props.isLogin} userManager={props.userManager}/>
          </li> */}
        </ul>
        <SearchData/>
        <Connect isLogin={props.isLogin} userManager={props.userManager}/>
      </div>
    </nav>
    // <header className="header">
    //   <Connect isLogin={props.isLogin} userManager={props.userManager}/>
    // </header>
  );
}