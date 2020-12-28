import React, {useEffect, useState} from 'react';
import Oidc from "oidc-client"
import Div from '../../components/atoms/Div';
import LoaderModal from '../../components/templates/Modals/LoaderModal';
import SendingResultModal from '../../components/templates/Modals/SendingResultModal';
import Navbar from '../../components/templates/Navbar';
import AcceptInvitationModalContainer from '../AcceptInvitationModalContainer';
import AddApplicationModalContainer from '../AddApplicationModalContainer';
import AppErrorHandler from '../../Api/AppErrorHandler';
import FileApi from '../../Api/FileApi';
import ChangeProfileModalContainer from '../ChangeProfileModalContainer';
import CreateGroupModalContainer from '../CreateGroupModalContainer';
import GroupContainer from '../GroupContainer';
import GroupListContainer from '../GroupListContainer';
import MainPageModel from '../../Models/MainPageModel';
import SimpleUserModel from '../../Models/SimpleUserModel';
import InvitationModel from '../../Models/InvitationModel';
import SignalRConnections from '../../Api/SignalRConnections';
import ApplicationHandlers from '../../Api/Hendlers/ApplicationHandlers';
import InvitationHandlers from '../../Api/Hendlers/InvitationHandlers';
import GroupHandlers from '../../Api/Hendlers/GroupHandlers';
import SuperMessengerHandlers from '../../Api/Hendlers/SuperMessengerHandlers';

import ApplicationServices from '../../Api/Services/ApplicationServices';
import InvitationsServices, { sendMyInvitations } from '../../Api/Services/InvitationsServices';
import GroupServices, { sendGroupData } from '../../Api/Services/GroupServices';
import SuperMessengerServices from '../../Api/Services/SuperMessengerServices';
import Start from '../../Api/Start';

const config = {
  authority: "https://localhost:44370",
  client_id: "js",
  redirect_uri: "https://localhost:44370/callback.html",
  response_type: "id_token token",
  scope: "openid profile api1",
  post_logout_redirect_uri: "https://localhost:44370",
};

export default function MessengerContainer() {
  const [isLogin, setIsLogin] = useState(false);
  const [mainPageData, setMainPageData] = useState(new MainPageModel());
  const [renderSendingResult, setRenderSendingResult] = useState(false);
  const [sendingResult, setSendingResult] = useState("");
  const [renderLoader, setRenderLoader] = useState(false);
  const [error, setError] = useState(null);
  const [userManager, setUserManager] = useState(new Oidc.UserManager(config));
  const [signalRConnections, setSignalRConnections] = useState(null);
  const [myInvitations, setMyInvitations] = useState([]);
  const [renderAcceptInvitationModalContainer, setRenderAcceptInvitationModalContainer] = useState(false);
  const [renderAddApplicationModalContainer, setRenderAddApplicationModalContainer] = useState(false);
  const [renderChangeProfileModalContainer, setRenderChangeProfileModalContainer] = useState(false);
  const [renderCreateGroupModalContainer, setRenderCreateGroupModalContainer] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState(new InvitationModel());
  const [foundUsers, setFoundUsers] = useState([]);
  const [connectedMethods, setConnectedMethods] = useState(0);


  useEffect(() => {
    if (connectedMethods === 23) {
      run();
    };
  }, [connectedMethods]);

  async function run() {
    await Start(signalRConnections.applicationHubConnection);
    await Start(signalRConnections.invitationHubConnection);
    await Start(signalRConnections.groupHubConnection);
    await Start(signalRConnections.superMessengerHubConnection);
    SuperMessengerServices.sendFirstData();
  }

  useEffect(() => {
    async function someFun() {
      setIsLogin((await userManager.getUser().then(async (user) => {
        if (user) {
          const connections = SignalRConnections(user.access_token);
          ApplicationHandlers.initializeData(connections.applicationHubConnection, setConnectedMethods);
          InvitationHandlers.initializeData(connections.invitationHubConnection, setConnectedMethods);
          GroupHandlers.initializeData(connections.groupHubConnection, setConnectedMethods);
          SuperMessengerHandlers.initializeData(connections.superMessengerHubConnection, setConnectedMethods);
          setSignalRConnections(connections);

          const appErrorHandler = new AppErrorHandler(setError);

          ApplicationServices.initializeData(
            connections.applicationHubConnection,
            handleReceiveSendingResult,
            appErrorHandler);
          InvitationsServices.initializeData(
            connections.invitationHubConnection,
            handleReceiveSendingResult,
            appErrorHandler);
          GroupServices.initializeData(
            connections.groupHubConnection,
            handleReceiveSendingResult,
            appErrorHandler);
          SuperMessengerServices.initializeData(
            connections.superMessengerHubConnection,
            handleReceiveSendingResult,
            appErrorHandler);
          FileApi.initializeData(appErrorHandler);

          ApplicationHandlers.increaseMyApplicationsCount(handleIncreaseMyApplicationsCount);
          ApplicationHandlers.reduceMyApplicationsCount(handleReduceMyApplicationsCount);

          InvitationHandlers.receiveInvitation(handleReceiveInvitation);
          InvitationHandlers.receiveMyInvitations(handleReceiveMyInvitations);
          InvitationHandlers.reduceMyInvitations(handleReduceMyInvitations);

          GroupHandlers.receiveSimpleGroup(handleReceiveSimpleGroup);
          SuperMessengerHandlers.receiveFirstData(handleReceiveMainPageData);
          SuperMessengerHandlers.receiveFoundUsers(handleReceiveFoundUsers);
          
          return true;
        }
        else {
          return false;
        }
      })
      ))
    }
    someFun();
  }, []);

  function handleLogin() {
    userManager.signinRedirect()
  }
  function handleLogout() {
    userManager.signoutRedirect()
  }
  
  function handleReceiveSendingResult(sendingResult) {
    setRenderLoader(false);
    setSendingResult(sendingResult);
    setRenderSendingResult(true);
  }
  
  function handleClickOpenAcceptInvitations() {
    sendMyInvitations();
    setRenderAcceptInvitationModalContainer(true);
  }

  function handleReceiveMainPageData(mainPageData) {
    setMainPageData(mainPageData);
  }
  
  function handleReceiveSimpleGroup(group) {
    setMainPageData(prevMainPageData => {
      if (prevMainPageData.groups) {
        prevMainPageData.groups.push(group);
      }
      else {
        prevMainPageData.groups = [group];
      }
      return {...prevMainPageData};
    });
  }
  
  function closeInvitation(groupId) {
    setSelectedInvitation(prevSelectedInvitation => {
      if (prevSelectedInvitation
        && prevSelectedInvitation.group
        && prevSelectedInvitation.group.id === groupId) {
        setRenderAcceptInvitationModalContainer(false);
        return new InvitationModel();
      }
      return { ...prevSelectedInvitation };
    });
  }
  function handleReduceMyInvitations(reduceInvtationModels) {
    if (myInvitations !== []) {
      reduceInvtationModels.forEach(reduceInvtationModel => {
        setMyInvitations(prevMyInvitations => {
          if (prevMyInvitations) {
            const prevMyInvitationsCope = prevMyInvitations
            .filter(invitation => invitation.group.id === reduceInvtationModel.groupId
              && invitation.invitedUser.id === reduceInvtationModel.invitedUserId
              && invitation.inviter.id === reduceInvtationModel.inviterId ? false : true);
            prevMyInvitations = prevMyInvitationsCope;
          }
          return [...prevMyInvitations];
        });
        closeInvitation(reduceInvtationModel.groupId);
      });


      // setMyInvitations(prevMyInvitations => {
      //   reduceInvtationModels.forEach(reduceInvtationModel => {
      //     if (prevMyInvitations) {
      //       const prevMyInvitationsCope = prevMyInvitations
      //       .filter(invitation => invitation.group.id === reduceInvtationModel.groupId
      //         && invitation.invitedUser.id === reduceInvtationModel.invitedUserId
      //         && invitation.inviter.id === reduceInvtationModel.inviterId ? false : true);
      //       prevMyInvitations = prevMyInvitationsCope;
      //     }
      //   });
      //   return [...prevMyInvitations]
      // });
      // closeInvitation(groupId);
    }
    const invitationsCount = reduceInvtationModels.length;
    setMainPageData(prevMainPageData => {
      if (prevMainPageData.invitationCount) {
        prevMainPageData.invitationCount -= invitationsCount;
      }
      return { ...prevMainPageData };
    });
  }

  function handleReceiveMyInvitations(invitations) {
    setMyInvitations(invitations);
    setMainPageData(prevMainPageData => {
      if (invitations) {
        prevMainPageData.invitationCount = invitations.length;
        return { ...prevMainPageData };
      }
    });
  }
  function handleReceiveInvitation(invitation) {
    setMainPageData(prevMainPageData => {
      prevMainPageData.invitationCount++;
      return {...prevMainPageData};
    });
    setMyInvitations(prevMyInvitations => [...prevMyInvitations, invitation]);
  }
  function handleIncreaseMyApplicationsCount(applicationsCount) {
    setMainPageData(prevMainPageData => {
      if (prevMainPageData.applicationCount) {
        prevMainPageData.applicationCount += applicationsCount;
      }
      else {
        prevMainPageData.applicationCount = applicationsCount;
      }
      return { ...prevMainPageData };
    });
  }
  function handleReduceMyApplicationsCount(applicationsCount) {
    setMainPageData(prevMainPageData => {
      if (prevMainPageData.applicationCount) {
        prevMainPageData.applicationCount -= applicationsCount;
      }
      return { ...prevMainPageData };
    });
  }

  function handleClickSelectedGroup(groupId) {
    sendGroupData(groupId);
  }
  function handleRenderSearchGroupToApplicationModal() {
    setRenderAddApplicationModalContainer(prevRenderAddApplication => !prevRenderAddApplication);
  }
  function handleClickCreateGroup() {
    setRenderCreateGroupModalContainer(true);
  }
  function handleClickChangeProfile() {
    setRenderChangeProfileModalContainer(true);
  }
  function handleReceiveFoundUsers(foundUsers) {
    setFoundUsers(foundUsers);
  }
  
  if (error !== null) {
    return (
      error
    )
  }
  else { 
    return (
      <Div>
        <Navbar
          isLogin={isLogin}
          onLogin={handleLogin}
          onLogout={handleLogout}
          mainPageData={mainPageData}
          onClickOpenAcceptInvitations={handleClickOpenAcceptInvitations}
          onClickRenderSearchNoMyGroupsModal={handleRenderSearchGroupToApplicationModal}
          onClickCreateGroup={handleClickCreateGroup}
          onClickChangeProfile={handleClickChangeProfile}
        />

        <Div className="row w-100 m-0">
          <GroupListContainer groups={mainPageData.groups} onClickSelectedGroup={handleClickSelectedGroup} />
          <GroupContainer
            setRenderLoader={setRenderLoader}
            setRenderAcceptInvitationModalContainer={setRenderAcceptInvitationModalContainer}
            setSelectedInvitation={setSelectedInvitation}
            simpleMe={new SimpleUserModel(mainPageData.id, mainPageData.email, mainPageData.imageName)}
            setMainPageData={setMainPageData}
            signalRConnections={signalRConnections}
            onReceiveSendingResult={handleReceiveSendingResult}
            foundUsers={foundUsers}
            setFoundUsers={setFoundUsers}
            closeInvitation={closeInvitation}
          />
          <AcceptInvitationModalContainer
            renderAcceptInvitationModalContainer={renderAcceptInvitationModalContainer}
            setSelectedInvitation={setSelectedInvitation}
            selectedInvitation={selectedInvitation}
            setRenderLoader={setRenderLoader}
            setRenderAcceptInvitationModalContainer={setRenderAcceptInvitationModalContainer}
            myInvitations={myInvitations}
          />
          <AddApplicationModalContainer
            renderAddApplicationModalContainer={renderAddApplicationModalContainer}
            setRenderAddApplicationModalContainer={setRenderAddApplicationModalContainer}
            connections={signalRConnections}
            setRenderLoader={setRenderLoader}
            simpleMe={new SimpleUserModel(mainPageData.id, mainPageData.email, mainPageData.imageName)}
          />
          <ChangeProfileModalContainer
            renderChangeProfileModalContainer={renderChangeProfileModalContainer}
            setRenderChangeProfileModalContainer={setRenderChangeProfileModalContainer}
            setRenderLoader={setRenderLoader}
          />
          <CreateGroupModalContainer
            renderCreateGroupModalContainer={renderCreateGroupModalContainer}
            setRenderCreateGroupModalContainer={setRenderCreateGroupModalContainer}
            simpleMe={new SimpleUserModel(mainPageData.id, mainPageData.email, mainPageData.imageName)}
            connections={signalRConnections}
            setRenderLoader={setRenderLoader}
            foundUsers={foundUsers}
            setFoundUsers={setFoundUsers}
          />
          <LoaderModal
            renderLoader={renderLoader}
            setRenderLoader={setRenderLoader}
          />
          <SendingResultModal
            renderSendingResult={renderSendingResult}
            setRenderSendingResult={setRenderSendingResult}
            sendingResult={sendingResult}
            setSendingResult={setSendingResult}
          />
        </Div>
      </Div>
    );
  }
}