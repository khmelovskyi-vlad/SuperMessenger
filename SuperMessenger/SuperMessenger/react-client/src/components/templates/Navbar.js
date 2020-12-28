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
export default function Navbar({
  isLogin,
  onLogin,
  onLogout,
  mainPageData,
  onClickOpenAcceptInvitations,
  onClickRenderSearchNoMyGroupsModal,
  onClickCreateGroup,
  onClickChangeProfile,
}) {
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
          {
            isLogin &&
            <Avatar imageName={mainPageData.imageName}/>
          }
          {
            mainPageData.invitationCount !== undefined && mainPageData.invitationCount !== null &&
            <Li className="nav-item active mx-1"
              children={
                <StandardButton
                  title="Invitations"
                  showSup={true}
                  value={mainPageData.invitationCount}
                  onClick={onClickOpenAcceptInvitations}
                />
              }
            />
          }
          {
            isLogin &&
            <Li className="nav-item active mx-1"
              children={
                <StandardButton
                  title="Add applications"
                  showSup={false}
                  onClick={onClickRenderSearchNoMyGroupsModal}
                />
              }
            />
          }
          {
            isLogin &&
            <Li className="nav-item active mx-1"
              children={
                <StandardButton
                  title="Create group"
                  showSup={false}
                  onClick={onClickCreateGroup}
                />
              }
            />
          }
          {
            isLogin &&
            <Li className="nav-item active mx-1"
              children={
                <StandardButton
                  title="Change profile"
                  showSup={false}
                  onClick={onClickChangeProfile}
                />
              }
            />
          }
        </Ul>
        <Connect isLogin={isLogin} onLogin={onLogin} onLogout={onLogout}/>
      </Div>
    </Nav>
  );
}