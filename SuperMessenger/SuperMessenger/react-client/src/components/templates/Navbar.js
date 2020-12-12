import React from 'react';
import Logotype from '../molecules/Logotype';
import Connect from '../molecules/Connect';
import Avatar from '../molecules/Avatar';
import Li from '../atoms/Li';
import Span from '../atoms/Span';
import Ul from '../atoms/Ul';
import Div from '../atoms/Div';
import Button from '../atoms/Button';
import Nav from '../atoms/Nav';
import StandardButton from '../molecules/StandardButton';
export default function Navbar(props) {
  return (
    <Nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor:"#34AEFF"}}>
      <Logotype />
      <Button
        className="navbar-toggler"
        type="button"
        toggle="collapse"
        target="#navbarSupportedContent"
        controls="navbarSupportedContent"
        expanded="false"
        label="Toggle navigation"
      >
        <Span className="navbar-toggler-icon"></Span>
      </Button>
      
      <Div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Ul className="navbar-nav mr-auto">
          {/* <li className="nav-item active">
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
          </li> */}{/*  C:\GIT\SuperMessenger\SuperMessenger\SuperMessenger\react-client\public\avatars */}
          {/* <li className="nav-item">
            <a style={{ color: "black" }} href="/api/SentFiles"
              // target="_blank"
              // download
            >download</a>
          </li> */}
          {
            props.isLogin &&
            <Avatar imageName={props.mainPageData.imageName}/>
          }
          {
            props.mainPageData.invitationCount != undefined && props.mainPageData.invitationCount != null &&
            <Li className="nav-item active mx-1"
              children={
                <StandardButton
                  title="Invitations"
                  showSup={true}
                  value={props.mainPageData.invitationCount}
                  onClick={props.onClickOpenAcceptInvitations}
                />
              }
            />
          }
          {
            props.isLogin &&
            <Li className="nav-item active mx-1"
              children={
                <StandardButton
                  title="Add applications"
                  showSup={false}
                  // value={props.mainPageData.applicationCount}
                  onClick={props.onClickRenderSearchNoMyGroupsModal}
                />
              }
            />
          }
          {
            props.isLogin &&
            <Li className="nav-item active mx-1"
              children={
                <StandardButton
                  title="Create group"
                  showSup={false}
                  onClick={props.onClickCreateGroup}
                />
              }
            />
          }
          {
            props.isLogin &&
            <Li className="nav-item active mx-1"
              children={
                <StandardButton
                  title="Change profile"
                  showSup={false}
                  onClick={props.onClickChangeProfile}
                />
              }
            />
          }
          {/* <li className="nav-item">
            <Connect isLogin={props.isLogin} userManager={props.userManager}/>
          </li> */}
        </Ul>
        {/* <SearchData/> */}
        <Connect isLogin={props.isLogin} userManager={props.userManager}/>
      </Div>
    </Nav>
    // <header className="header">
    //   <Connect isLogin={props.isLogin} userManager={props.userManager}/>
    // </header>
  );
}