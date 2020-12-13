import React, { useState, useEffect, useRef, useCallback } from 'react';
import Oidc from "oidc-client"
// import { render } from '@testing-library/react';
import Navbar from '../components/templates/Navbar';
import MainPage from '../components/templates/MainPage';
import Api from '../Api';
import MainPageModel from '../containers/Models/MainPageModel';
import GroupModel from '../containers/Models/GroupModel';
import MessageModel from '../containers/Models/MessageModel';
import { stringify, v4 as uuidv4 } from 'uuid';
import SimpleUserModel from '../containers/Models/SimpleUserModel';
import SendingInvitationResult from '../containers/Enums/SendingInvitationResult';
import Invitation from '../containers/Models/Invitation';
import ModalType from '../containers/Enums/ModalType';
import { animateScroll } from "react-scroll";
import Application from '../containers/Models/Application';
import ApplicationResultType from '../containers/Enums/ApplicationResultType';
import InvitationResultType from '../containers/Enums/InvitationResultType';
import GroupResultType from '../containers/Enums/GroupResultType';
import Button from '../components/atoms/Button';
import Sup from '../components/atoms/Sup';
import Div from '../components/atoms/Div';
import ConfirmationType from '../containers/Enums/ConfirmationType';
import FileFormModel from '../containers/Models/FileFormModel';
import MessageFileModel from '../containers/Models/MessageFileModel';
import NewGroupModel from '../containers/Models/NewGroupModel';
import GroupImgModel from '../containers/Models/GroupImgModel';
import SuperMessengerHub from '../containers/Api/SignalR/SuperMessengerHub';
import GroupHub from '../containers/Api/SignalR/GroupHub';
import InvitationHub from '../containers/Api/SignalR/InvitationHub';
import ApplicationHub from '../containers/Api/SignalR/ApplicationHub';
import FileApi from '../containers/Api/FileApi';
import AppErrorHandler from '../containers/Api/AppErrorHandler';
import NewFilesModel from '../containers/Models/NewFilesModel';
import { request } from 'http';
import Loader from '../components/molecules/Loader';
import GroupType from '../containers/Enums/GroupType';
import NewProfileModel from '../containers/Models/NewProfileModel';
import NewFileModel from '../containers/Models/NewFileModel';
const path = require('path');
const config = {
authority: "https://localhost:44370",
client_id: "js",
redirect_uri: "https://localhost:44370/callback.html",
response_type: "id_token token",
scope: "openid profile api1",
post_logout_redirect_uri: "https://localhost:44370",
};

export default function Messenger() {
  const [userManager, setUserManager] = useState(new Oidc.UserManager(config));
  const [isLogin, setIsLogin] = useState(false);
  const [mainPageData, setMainPageData] = useState(new MainPageModel());
  const [groupData, setGroupData] = useState(new GroupModel());
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [foundUsers, setFoundUsers] = useState([]);
  const [renderNewMemberModal, setRenderNewMemberModal] = useState(false);
  const [renderAddInvitationModal, setRenderAddInvitationModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(new SimpleUserModel());
  const [renderSendingResult, setRenderSendingResult] = useState(false);
  const [sendingResult, setSendingResult] = useState("");
  const [myInvitations, setMyInvitations] = useState([]);
  const [renderMyInvitations, setRenderMyInvitations] = useState(false);
  const [renderMyInvitation, setRenderMyInvitation] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState(new Invitation());
  const [openModals, setOpenModals] = useState([]);
  // const [currentOpenModalIndex, setCurrentOpenModalIndex] = useState(0);
  const [renderAddApplication, setRenderAddApplication] = useState(false);
  const [renderSearchGroupToApplicationModal, setRenderSearchGroupToApplicationModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [foundGroups, setFoundGroups] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [renderGroupApplication, setRenderGroupApplication] = useState(false);
  const [renderGroupApplications, setRenderGroupApplications] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(new Application());
  const [renderCreateGroup, setRenderCreateGroup] = useState(false);
  const [renderChangeProfile, setRenderChangeProfile] = useState(false);
  const [renderConfirmation, setRenderConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState(null);
  // const [api, setApi] = useState(null);
  const [error, setError] = useState(null);
  const appErrorHandler = new AppErrorHandler(setError);
  const [superMessengerHub, setSuperMessengerHub] = useState(new SuperMessengerHub(appErrorHandler, handleReceiveSendingResult));
  const [groupHub, setGroupHub] = useState(new GroupHub(appErrorHandler, handleReceiveSendingResult));
  const [applicationHub, setApplicationHub] = useState(new ApplicationHub(appErrorHandler, handleReceiveSendingResult));
  const [invitationHub, setInvitationHub] = useState(new InvitationHub(appErrorHandler, handleReceiveSendingResult));
  const [fileApi, setFileApi] = useState(new FileApi(appErrorHandler));
  const [renderLoader, setRenderLoader] = useState(false);
  const api = useRef(new Api());
  useEffect(() => {
    async function someFun() {
      setIsLogin((await userManager.getUser().then(async (user) => {
        if (user) {
          await superMessengerHub.connect(
            user.access_token,
            handleReceiveMainPageData,
            handleReceiveFoundUsers,
            handleReceiveMessage,
            handleReceiveNewProfile,
            handleReceiveNewUserData,
            handleReceiveMessageConfirmation,
            handleReceiveFileConfirmations,
            handleReceiveFiles,
            handleReceiveLeftGroupUserId,
            handleReceiveRomevedGroup,
            handleReceiveNewGroupUser,
          );
          await groupHub.connect(
            user.access_token,
            handleReceiveGroupData,
            handleReceiveFoundGroups,
            handleReceiveCheckGroupNamePartResult,
            handleReceiveSimpleGroup,
            handleReceiveGroupResultType,
          );
          await applicationHub.connect(
            user.access_token,
            handleReceiveApplication,
            handleReceiveMyApplications,
            handleReceiveSendingResultDeclineApplication,
            handleReceiveApplicationResultType,
            handleReduceMyApplicationsCount,
            handleReduceGroupApplication,
            handleIncreaseMyApplicationsCount,
          );
          await invitationHub.connect(
            user.access_token,
            handleReceiveInvitation,
            handleReceiveMyInvitations,
            handleReceiveSendingResultDeclineInvitation,
            handleReceiveInvitationResultType,
            handleReduceMyInvitations,
          );

          await api.current.connectToHubs(
            user.access_token,
            handleReceiveMainPageData,
            handleReceiveFoundUsers,
            handleReceiveGroupData,
            // handleReceiveSendingResultAddInvitation,
            handleReceiveInvitation,
            handleReceiveMyInvitations,
            // handleReceiveSendingResultAcceptInvitation,
            handleReceiveSendingResultDeclineInvitation,
            handleReceiveMessage,
          
            // handleReceiveSendingResultAddApplication,
            handleReceiveApplication,
            handleReceiveMyApplications,
            // handleReceiveSendingResultAcceptApplication,
            handleReceiveSendingResultDeclineApplication,
            handleReceiveFoundGroups,
            // handleReceiveApplicationConfirmation,
            handleReceiveNewGroupUser,
            handleReceiveCheckGroupNamePartResult,
            // handleReceiveGroup,
          
            handleReceiveApplicationResultType,
            handleReceiveInvitationResultType,
            handleReceiveSimpleGroup,
            handleReceiveGroupResultType,
            handleReceiveLeftGroupUserId,
            handleReceiveNewProfile,
            handleReceiveNewUserData,
            handleReceiveMessageConfirmation,
            handleReceiveFileConfirmations,
            handleReceiveFiles,
            handleReduceMyInvitationsCount,
            handleReduceMyApplicationsCount,
            handleReduceGroupApplication,
            handleIncreaseMyApplicationsCount,
            handleReduceMyInvitations);
          superMessengerHub.sendFirstData();
          // setApi({api: new Api(user.access_token)})
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
  function handleReceiveSendingResult(sendingResult) {
    setRenderLoader(false);
    setSendingResult(sendingResult);
    setOpenModals(prev => [...prev, ModalType.renderResult]);
    setRenderSendingResult(true);
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
  function handleReduceMyInvitations(reduceInvtationModels) {
    if (myInvitations != []) {
      setMyInvitations(prevMyInvitations => {
        reduceInvtationModels.forEach(reduceInvtationModel => {
          if (prevMyInvitations) {
            const prevMyInvitationsCope = prevMyInvitations
            .filter(invitation => invitation.simpleGroup.id === reduceInvtationModel.groupId
              && invitation.invitedUser.id === reduceInvtationModel.invitedUserId
              && invitation.inviter.id === reduceInvtationModel.inviterId ? false : true);
            prevMyInvitations = prevMyInvitationsCope;
          }
        });
        return [...prevMyInvitations]
      });
    }
    const invitationsCount = reduceInvtationModels.length;
    setMainPageData(prevMainPageData => {
      if (prevMainPageData.invitationCount) {
        prevMainPageData.invitationCount -= invitationsCount;
      }
      return { ...prevMainPageData };
    });
  }
  function handleReduceMyInvitationsCount(invitationsCount) {
    setMainPageData(prevMainPageData => {
      if (prevMainPageData.invitationCount) {
        prevMainPageData.invitationCount -= invitationsCount;
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
  function handleReduceGroupApplication(userId, groupId) {
    setGroupData(prevGroupData => {
      if (prevGroupData && prevGroupData.id === groupId && prevGroupData.applications) {
        prevGroupData.applications = prevGroupData.applications.filter(application => application.user.id != userId);
      }
      return { ...prevGroupData };
    });
  }
  // console.log(renderNewMemberModal);
  // console.log(openModals);
  function handleClickOpenAcceptApplications(applications) {
    setOpenModals(prev => [...prev, ModalType.acceptApplications])
    // api.current.sendMyInvitation();
    setMyApplications(applications);
    setRenderGroupApplications(true);
  }
  
  function handleClickDeclineApplication(e, application) {
    setOpenModals(prev => [...prev, ModalType.loader]);
    setRenderLoader(true);
    applicationHub.rejectApplication(application);
    setRenderGroupApplication(false);
    // api.current.sendInvitation(invitation);
    // setFoundUsers([]);
  }
  function handleClickOpenAcceptApplication(application) {
    setOpenModals(prev => [...prev, ModalType.acceptApplication])
    setSelectedApplication(application);
    setRenderGroupApplications(false);
    setRenderGroupApplication(true);
  }
  function handleClickAcceptApplication(e, application) {
    setOpenModals(prev => [...prev, ModalType.loader]);
    setRenderLoader(true);
    applicationHub.acceptApplication(application);
    setRenderGroupApplication(false);
    // api.current.sendInvitation(invitation);
    // setFoundUsers([]);
  }

  function handleReceiveFoundGroups(foundGroups) {
    setFoundGroups(foundGroups);
  }
  function handleRenderSearchGroupToApplicationModal() {
    setOpenModals(prev => [...prev, ModalType.searchGroupToApplication])
    setRenderSearchGroupToApplicationModal(prevRenderAddApplication => !prevRenderAddApplication);
    // setRenderAddInvitationModal(true);
  }
  function handleClickSelectedGroupModal(selectedGroupId) {
    setOpenModals(prev => [...prev, ModalType.addApplication])
    setSelectedGroupId(selectedGroupId);
    setRenderSearchGroupToApplicationModal(false);
    setRenderAddApplication(true);
  }

  function handleChangeSearchNoMyGroups(e) {
    groupHub.searchNoMyGroups(e.target.value);
  }
  function handleSubmitAddApplication(e, application) {
    setRenderAddApplication(false);
    applicationHub.sendApplication(application);
    setFoundGroups([]);
    setOpenModals(prev => [...prev, ModalType.loader]);
    setRenderLoader(true);
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
  function handleReceiveMyApplications(applications) {
    setMyApplications(applications);
  }
  function handleClickOpenAcceptInvitations() {
    setOpenModals(prev => [...prev, ModalType.acceptInvitations])
    invitationHub.sendMyInvitations();
    setRenderMyInvitations(true);
  }
  function handleClickOpenAcceptInvitation(invitation) {
    setOpenModals(prev => [...prev, ModalType.acceptInvitation])
    setSelectedInvitation(invitation);
    setRenderMyInvitations(false);
    setRenderMyInvitation(true);
  }
  function handleReceiveMainPageData(mainPageData) {
    setMainPageData(mainPageData);
  }
  function handleReceiveFoundUsers(foundUsers) {
    setFoundUsers(foundUsers);
  }
  function handleReceiveGroupData(groupData) {
    setGroupData(groupData);
    scrollToBottom("Chat");
  }
  function scrollToBottom(id) {
    animateScroll.scrollToBottom({
      containerId: id
    });
  }
  
  function openNeedModal(modalType) {
    switch (modalType) {
      case ModalType.addInvitation:
        setRenderAddInvitationModal(true);
        break;
      case ModalType.acceptInvitation:
        setRenderMyInvitation(true);
        break;
      case ModalType.acceptInvitations:
        setRenderMyInvitations(true);
        break;
      case ModalType.searchGroupToApplication:
        setRenderSearchGroupToApplicationModal(true);
        break;
      case ModalType.addApplication:
        setRenderAddApplication(true);
        break;
      case ModalType.acceptApplication:
        setRenderGroupApplication(true);
        break;
      case ModalType.acceptApplications:
        setRenderGroupApplications(true);
        break;
      case ModalType.createGroup:
        setRenderCreateGroup(true);
        break;
      case ModalType.changeProfile:
        setRenderChangeProfile(true);
        break;
      case ModalType.searchUser:
        setRenderNewMemberModal(true);
        break;
      case ModalType.confirmation:
        setRenderConfirmation(true);
        break;
      default:
        break;
    }
  }
  function handleClickBackModal() {
    if (openModals.length > 0) {
      const lastModel = openModals[openModals.length - 1];
      let changeOpenModals = true;
      switch (lastModel) {
        case ModalType.addInvitation:
          setRenderAddInvitationModal(false);
          break;
        case ModalType.acceptInvitation:
          setRenderMyInvitation(false);
          break;
        case ModalType.acceptInvitations:
          setRenderMyInvitations(false);
          break;
        case ModalType.searchGroupToApplication:
          setRenderSearchGroupToApplicationModal(false);
          break;
        case ModalType.addApplication:
          setRenderAddApplication(false);
          break;
        case ModalType.acceptApplication:
          setRenderGroupApplication(false);
          break;
        case ModalType.acceptApplications:
          setRenderGroupApplications(false);
          break;
        case ModalType.createGroup:
          setRenderCreateGroup(false);
          break;
        case ModalType.changeProfile:
          setRenderChangeProfile(false);
          break;
        case ModalType.searchUser:
          setRenderNewMemberModal(false);
          break;
        case ModalType.confirmation:
          setRenderConfirmation(false);
          setConfirmationType(null);
          break;
        default:
          changeOpenModals = false;
          break;
      }
      if (changeOpenModals) {
        if (openModals.length > 1) {
          openNeedModal(openModals[openModals.length - 2]);
        }
        setOpenModals((prevOpenModal) => {
          prevOpenModal.pop();
          return [...prevOpenModal];
        });
      }
    }
  }
  function handleClickCloseModal() {
    if (openModals.length > 0) {
      const lastModel = openModals[openModals.length - 1];
      let cleanOpenModals = true;
      switch (lastModel) {
        case ModalType.renderResult:
          setSendingResult("");
          setRenderSendingResult(false);
          break;
        case ModalType.addInvitation:
          setRenderAddInvitationModal(false);
          break;
        case ModalType.acceptInvitation:
          setRenderMyInvitation(false);
          break;
        case ModalType.acceptInvitations:
          setRenderMyInvitations(false);
          break;
        case ModalType.searchGroupToApplication:
          setFoundGroups([]);
          setRenderSearchGroupToApplicationModal(false);
          break;
        case ModalType.addApplication:
          setRenderAddApplication(false);
          break;
        case ModalType.acceptApplication:
          setRenderGroupApplication(false);
          break;
        case ModalType.acceptApplications:
          setRenderGroupApplications(false);
          break;
        case ModalType.createGroup:
          setFoundUsers([]);
          setRenderCreateGroup(false);
          break;
        case ModalType.changeProfile:
          setRenderChangeProfile(false);
          break;
        case ModalType.searchUser:
          setFoundUsers([]);
          setRenderNewMemberModal(false);
          break;
        case ModalType.confirmation:
          setRenderConfirmation(false);
          setConfirmationType(null);
          break;
        case ModalType.loader:
          setRenderLoader(false);
          break;
        default:
          cleanOpenModals = false;
          break;
      }
      if (cleanOpenModals) {
        setOpenModals([]);
        // setCurrentOpenModalIndex([]);
      }
    }
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
  
  
  function handleReceiveApplicationResultType(resultType) {
    switch (resultType) {
      case ApplicationResultType.wasSentEarlier:
        setSendingResult("The application was sent earlier");
        break;
      case ApplicationResultType.youAreInGroup:
        setSendingResult("You are in thr group");
        break;
      // case ApplicationResultType.successSubmitted:
      //   setSendingResult("The application was successfully submitted");
      //   break;
      // case ApplicationResultType.userIsInGroup:
      //   setSendingResult("User is in the group");
      //   break;
      // case ApplicationResultType.successAccepting:
      //   setSendingResult("The application was successfully accepted");
      //   break;
      // case InvitationResultType.successRejecting:
      //   setSendingResult("The application was successfully rejected");
      //   break;
      // case ApplicationResultType.notHaveApplication:
      //   setSendingResult("No have the application");
      //   break;
      case ApplicationResultType.youAreNotCreator:
        setSendingResult("You are not a creator");
        break;
      case ApplicationResultType.invalidGroupType:
        setSendingResult("Bad group type");
        break;
      case ApplicationResultType.invalidValue:
        setSendingResult("Invalid application");
        break;
    }
  }
  function handleReceiveInvitationResultType(resultType) {
    switch (resultType) {
      case InvitationResultType.userIsInGroup:
        setSendingResult("The user is in the group");
        break;
      case InvitationResultType.wasInvitedEarlier:
        setSendingResult("The invitation was sent earlier");
        break;
      case InvitationResultType.successSubmitted:
        setSendingResult("The invitation was successfully submitted");
        break;
      case InvitationResultType.haveNoPermissions:
        setSendingResult("You have no permissions");
        break;
      // case InvitationResultType.notHaveInvitation:
      //   setSendingResult("Don't have the invitation");
      //   break;
      // case InvitationResultType.successAccepting:
      //   setSendingResult("The invitation was successfully accepted");
      //   break;
      // case InvitationResultType.successDeclining:
      //   setSendingResult("The invitation was successfully declined");
      //   break;
      case InvitationResultType.invalidValue:
        setSendingResult("Invalid invitation");
        break;
    }
  }
  function handleReceiveGroupResultType(resultType) {
    switch (resultType) {
      case GroupResultType.nameIsUsed:
        setSendingResult("This group name is currently in use");
        break;
      case GroupResultType.tooManyInvitations:
        setSendingResult("The invitation was sent earlier");
        break;
      case GroupResultType.tooFewInvitations:
        setSendingResult("The invitation was successfully submitted");
        break;
      case GroupResultType.youAreInGroup:
        setSendingResult("You are in this group");
        break;
      case GroupResultType.noHaveThisType:
        setSendingResult("Don't have this type");
        break;
      // case GroupResultType.successAdded:
      //   setSendingResult("The group was successfully added");
      //   break;
      case GroupResultType.invalidName:
        setSendingResult("Invalid group name");
        break;
      // case GroupResultType.successLeft:
      //   setSendingResult("The group was successfully left");
      //   break;
      case GroupResultType.noLeft:
        setSendingResult("The group wasn't left");
        break;
      // case GroupResultType.successRemoved:
      //   setSendingResult("The group was successfully removed");
      //   break;
      case GroupResultType.haveNoPermissions:
        setSendingResult("You haven't need permissions");
        break;
    }
  }
  // function handleReceiveSendingResultAddApplication(sendingResult) {
  //   console.log(sendingResult);
  // }
  // function handleReceiveSendingResultAcceptInvitation(sendingResult, group) {
  //   if (SendingInvitationResult.successAccepting === sendingResult) {
  //     setMainPageData(prevMainPageData => {
  //       prevMainPageData.groups.push(group);
  //       return {...prevMainPageData};
  //     });
  //     setSendingResult("Invitation accept");
  //   } else {
  //   }
  // }
  // function handleReceiveApplicationConfirmation(group) {
  //   setMainPageData(prevMainPageData => {
  //     prevMainPageData.groups.push(group);
  //     return {...prevMainPageData};
  //   });
  // }
  function handleReceiveNewGroupUser(userInGroup, groupId){
    setGroupData(prevGroupData => {
      if (prevGroupData.id === groupId) {
        prevGroupData.usersInGroup.push(userInGroup);
      }
      return {...prevGroupData};
    });
  }

  function handleReceiveLeftGroupUserId(userId, groupId) {
    setGroupData(prevGroupData => {
      if (prevGroupData.id === groupId) {
        const users = prevGroupData.usersInGroup.filter(user => user.id !== userId);
        prevGroupData.usersInGroup = users;
      }
      return {...prevGroupData};
    });
  }
  function handleReceiveRomevedGroup(groupId, removalResult) {
    setMainPageData(prevMainPageData => {
      if (prevMainPageData.groups) {
        prevMainPageData.groups = prevMainPageData.groups.filter(group => group.id !== groupId);
      }
      return { ...prevMainPageData };
    });
    setGroupData(prevGroupData => {
      if (prevGroupData.id === groupId) {
        if (!prevGroupData.isCreator) {
          setRenderSendingResult(true);
          setSendingResult(removalResult);
          setOpenModals(prev => [...prev, ModalType.renderResult])
        }
        setShowGroupInfo(false);
        return new GroupModel();
      }
      return { ...prevGroupData };
    });
  }
  function handleClickRemoveGroup() {
    setOpenModals(prev => [...prev, ModalType.confirmation])
    setConfirmationType(ConfirmationType.removingGroup);
    setRenderConfirmation(true);
  }
  function handleClickLeaveGroup() {
    setOpenModals(prev => [...prev, ModalType.confirmation])
    setConfirmationType(ConfirmationType.leavingGroup);
    setRenderConfirmation(true);
  }
  function handleAcceptConfirmation(e, confirmationType) {
    switch (confirmationType) {
      case ConfirmationType.leavingGroup:
        leaveGroup();
        break;
      case ConfirmationType.removingGroup:
        removeGroup();
        break;
      default:
        break;
    }
  }
  function handleRejectConfirmation(e, confirmationType) {
    switch (confirmationType) {
      case ConfirmationType.leavingGroup:
        handleClickCloseModal();
        break;
      case ConfirmationType.removingGroup:
        handleClickCloseModal();
        break;
      default:
        break;
    }
  }
  function removeGroup() {
    groupHub.removeGroup(groupData.id);
    setOpenModals(prev => [...prev, ModalType.loader])
    setRenderLoader(true);
    setRenderConfirmation(false);
    setConfirmationType(null);
  }
  function leaveGroup() {
    const groupId = groupData.id;
    setMainPageData(prevMainPageData => {
      const groups = prevMainPageData.groups.filter(group => group.id !== groupId);
      prevMainPageData.groups = groups;
      return {...prevMainPageData};
    });
    setShowGroupInfo(false);
    groupHub.leaveGroup(groupId);
    setGroupData(new GroupModel());
    setRenderConfirmation(false);
    setConfirmationType(null);
    setOpenModals(prev => [...prev, ModalType.loader]);
    setRenderLoader(true);
  }
  // function handleReceiveSendingResultAcceptApplication(sendingResult) {
  //   // console.log(sendingResult);
  //   // console.log(group);
  //   if (SendingInvitationResult.successAcceptingApplication === sendingResult) {
  //     setSendingResult("Application accept");
  //   } else {
  //   }
  // }
  function handleReceiveSendingResultDeclineInvitation(sendingResult) {
    console.log(sendingResult);
  }
  function handleReceiveSendingResultDeclineApplication(sendingResult) {
    console.log(sendingResult);
  }
  function handleReceiveInvitation(invitation) {
    setMainPageData(prevMainPageData => {
      prevMainPageData.invitationCount++;
      return {...prevMainPageData};
    });
    setMyInvitations(prevMyInvitations => [...prevMyInvitations, invitation]);
  }
  function handleReceiveApplication(application) {
    // setMainPageData(prevMainPageData => {
    //   prevMainPageData.applicationCount++;
    //   return {...prevMainPageData};
    // });
    setGroupData(prevGroupData => {
      if (prevGroupData.id === application.groupId) {
        prevGroupData.applications.push(application);
      }
        return { ...prevGroupData };
    })
    
    // setMyApplications(prevMyApplications => [...prevMyApplications, application]);
  }
  function handleClickRenderNewMemberModal() {
    // setRenderNewMemberModal(prevRenderNewMemberModal => !prevRenderNewMemberModal);
    setOpenModals(prev => [...prev, ModalType.searchUser])
    setRenderNewMemberModal(true);
  }
  // function handleClickRenderNewMemberModal() {
  //   setRenderNewMemberModal(prevRenderNewMemberModal => !prevRenderNewMemberModal);
  //   setRenderAddInvitationModal(prevRenderAddInvitationModal => !prevRenderAddInvitationModal);
  // }
  function handleReceiveMessage(message) {
    setGroupData(prevGroupData => {
      if (prevGroupData.id === message.groupId) {
        prevGroupData.messages.push(message);
      }
      return {...prevGroupData};
    });
    setMainPageData(prevMainPageData => {
      prevMainPageData.groups.find(group => group.id === message.groupId).lastMessage = message;
      return {...prevMainPageData};
    });
  }
  function handleReceiveFiles(files) {
    files.forEach(file => {
      setGroupData(prevGroupData => {
        if (prevGroupData.id === file.groupId) {
          prevGroupData.sentFiles.push(file);
        }
        return {...prevGroupData};
      });
      setMainPageData(prevMainPageData => {
        const lastMessage = new MessageModel(file.id,
          file.value,
          file.sendDate,
          file.groupId,
          file.user,
          true)
        prevMainPageData.groups.find(group => group.id === file.groupId).lastMessage = lastMessage;
        return {...prevMainPageData};
      });
    });
  }
  function handleClickSelectedUser(selectedUser) {
    setOpenModals(prev => [...prev, ModalType.addInvitation])
    setSelectedUser(selectedUser);
    // setRenderNewMemberModal(prevRenderNewMemberModal => !prevRenderNewMemberModal);
    setRenderNewMemberModal(false);
    // setRenderAddInvitationModal(prevRenderAddInvitationModal => !prevRenderAddInvitationModal);
    setRenderAddInvitationModal(true);
  }
  function handleSubmitAddInvitation(e, invitation) {
    setRenderAddInvitationModal(false);
    invitationHub.sendInvitation(invitation);
    setFoundUsers([]);
    setOpenModals(prev => [...prev, ModalType.loader]);
    setRenderLoader(true);
    // e.target.reset();
  }
  function handleClickSelectedGroup(groupId) {
    groupHub.sendGroupData(groupId);
  }
  function handleSubmitSendMessage(event, message) {
    // message.simpleUserModel = null;
    // message.sendDate = new Date();
    if (message.value.length > 0) {
      message.id = uuidv4();
      message.sendDate = new Date(Date.now());
      setGroupData(prevGroupData => {
        prevGroupData.messages.push(message);
        return {...prevGroupData};
      });
      setMainPageData(prevMainPageData => {
        prevMainPageData.groups.find(group => group.id === message.groupId).lastMessage = message;
        return {...prevMainPageData};
      });
      superMessengerHub.sendMessage(message);
      event.target.reset();
    }
    event.preventDefault();
    // return null;
  }
  function handleReceiveMessageConfirmation(messageConfirmation) {
    setGroupData(prevGroupData => {
      const needMessage = prevGroupData.messages.find(message => message.id === messageConfirmation.previousId);
      if (needMessage) {
        needMessage.id = messageConfirmation.id;
        needMessage.sendDate = messageConfirmation.sendDate;
        needMessage.isConfirmed = true;
      }
      return {...prevGroupData};
    });
    setMainPageData(prevMainPageData => {
      const needGroup = prevMainPageData.groups.find(group => group.id === messageConfirmation.groupId);
      if (needGroup) {
        const lastMessage = needGroup.lastMessage;
        if (lastMessage && lastMessage.id == messageConfirmation.previousId) {
          lastMessage.id = messageConfirmation.id;
          lastMessage.sendDate = messageConfirmation.sendDate;
        }
      }
      return {...prevMainPageData};
    });
  }
  function handleReceiveFileConfirmationsFoo(fileConfirmations) {
    fileConfirmations.forEach(fileConfirmation => {
      setGroupData(prevGroupData => {
        const needFile = prevGroupData.sentFiles.find(file => file.id === fileConfirmation.previousId);
        if (needFile) {
          needFile.id = fileConfirmation.id;
          needFile.sendDate = fileConfirmation.sendDate;
          needFile.contentId = fileConfirmation.contentId;
          needFile.isConfirmed = true;
        }
        return {...prevGroupData};
      });
      setMainPageData(prevMainPageData => {
        const needGroup = prevMainPageData.groups.find(group => group.id === fileConfirmation.groupId);
        if (needGroup) {
          const lastMessage = needGroup.lastMessage;
          if (lastMessage && lastMessage.id == fileConfirmation.previousId) {
            lastMessage.id = fileConfirmation.id;
            lastMessage.sendDate = fileConfirmation.sendDate;
            lastMessage.isConfirmed = true;
          }
        }
        return {...prevMainPageData};
      });
    });
  }
  // function receiveMessage() {
  //   console.log("some text");
  //   console.log(api);
  //   console.log(api.current.foo);
  //   console.log(api.sendFirstData);
  //   console.log(api.valueConnection);
  //   console.log(api.createConnection);
  //   // console.log(api);
  //   api.current.foo();
  // }
  // checkLogin() {
  //   this.state.userManager.getUser().then((user) => {
  //     if (user) {
  //       this.setState({ isLogin: true });
  //       this.setState({ playerName: user.profile.name });
  //       this.setState({ fileMaster: new FileMaster(user.access_token) });
  //       this.setState({ api: new Api(user.access_token) });
  //     }
  //     else {
  //     }
  //   });
  // }
  function handleReceiveNewUserData(user) {
    setGroupData(prevGroupData => {
      if (prevGroupData.usersInGroup) {
        const needUser = prevGroupData.usersInGroup.find(u => u.id === user.id);
        if (needUser) {
          needUser.imageName = user.imageName;
          needUser.email = user.email;
    console.log("super2");
        }
      }
      return { ...prevGroupData };
    });
    console.log("super2");
  }
  function handleClickShowGroupInfo(){
    setShowGroupInfo(prevShowGroupInfo => !prevShowGroupInfo);
  }
  function handleClickNewMember() {
    
  }
  function handleChangeSearchNoInvitedUsers(e) {
    superMessengerHub.searchNoInvitedUsers(e.target.value, groupData.id);
  }
  function handleChangeSearchUsers(userEmailPart, userIds) {
    superMessengerHub.searchUsers(userEmailPart, userIds);
  }
  function handleClickAcceptInvitation(e, invitation) {
    setOpenModals(prev => [...prev, ModalType.loader]);
    setRenderLoader(true);
    invitationHub.acceptInvitation(invitation);
    setRenderMyInvitation(false);
  }
  function handleClickDeclineInvitation(e, invitation) {
    setOpenModals(prev => [...prev, ModalType.loader]);
    setRenderLoader(true);
    invitationHub.declineInvitation(invitation);
    setRenderMyInvitation(false);
  }
  function handleCheckGroupName(groupNamePart) {
    groupHub.checkGroupNamePart(groupNamePart);
  }
  const [canUseGroupName, setCanUseGroupName] = useState(null);
  function handleReceiveCheckGroupNamePartResult(canUseGroupName) {
    setCanUseGroupName(canUseGroupName);
  }
  
  function handleSubmitCreateGroup(event, groupImg, groupType, groupName, invitations) {
    console.log(canUseGroupName);
    if (!(groupType.length <= 0
      || groupName.length <= 0
      || (groupType === GroupType.chat && groupImg)
      || (groupType === GroupType.chat && groupName.length !== 1)
      || (groupType === GroupType.chat && invitations.length !== 1)
      || !canUseGroupName)) {
      const newGroupModel = new NewGroupModel();
      setOpenModals(prev => [...prev, ModalType.loader]);
      setRenderLoader(true);
      setRenderCreateGroup(false);
      newGroupModel.name = groupName;
      newGroupModel.type = groupType;
      newGroupModel.invitations = invitations;
      if (groupImg) {
        newGroupModel.haveImage = true;
        const formData = new FormData();
        formData.append("groupImg", groupImg);
        fileApi.sendNewGroup(formData, newGroupModel, groupHub.createGroup);
      }
      else {
        newGroupModel.haveImage = false;
        groupHub.createGroup(newGroupModel);
      }
    }
    event.preventDefault();
  }
  function handleClickCreateGroup() {
    setOpenModals(prev => [...prev, ModalType.createGroup])
    setRenderCreateGroup(true);
  }
  function handleClickChangeProfile() {
    setOpenModals(prev => [...prev, ModalType.changeProfile])
    setRenderChangeProfile(true);
  }
  function handleSubmitChangeProfile(event, myFirstName, myLastName, avatar) {
    const haveNewAvatar = avatar !== null && avatar !== undefined;
    if (haveNewAvatar || myFirstName.length != 0 || myLastName.length != 0) {
      setOpenModals(prev => [...prev, ModalType.loader]);
      setRenderLoader(true);
      setRenderChangeProfile(false);
      const newProfileModel = new NewProfileModel(myFirstName, myLastName);
      if (haveNewAvatar) {
        newProfileModel.haveImage = true;
        const formData = new FormData();
        formData.append("avatar", avatar);
        fileApi.changeProfile(formData, newProfileModel, superMessengerHub.changeProfile);
      }
      else {
        newProfileModel.haveImage = false;
        superMessengerHub.changeProfile(newProfileModel);
      }
    }
    event.preventDefault();
  }
  function handleReceiveNewProfile(profile) {
    setMainPageData(prevMainPageData => {
      prevMainPageData.imageName = profile.imageName;
      prevMainPageData.firstName = profile.firstName;
      prevMainPageData.lastName = profile.lastName;
    console.log("super");
      return { ...prevMainPageData };
    });
    setGroupData(prevGroupData => {
      if (prevGroupData.usersInGroup) {
        prevGroupData.usersInGroup.find(user => user.id === profile.id).imageName = profile.imageName;
        console.log("super");
      }
      return { ...prevGroupData };
    });
    console.log("super");
  }
  // console.log(path);
  const [sentFiles, setSentFiles] = useState([]);
  console.log(mainPageData);
  function handleReceiveFileConfirmations(fileConfirmations) {
    fileConfirmations.forEach(fileConfirmation => {
      setGroupData(prevGroupData => {
        if (fileConfirmation.groupId === prevGroupData.id && prevGroupData.sentFiles) {
          const needFile = prevGroupData.sentFiles.find(file => file.id === fileConfirmation.previousId);
          if (needFile) {
            needFile.id = fileConfirmation.id;
            needFile.sendDate = fileConfirmation.sendDate;
            needFile.isConfirmed = true;
          }
        }
        return {...prevGroupData};
      });
      setMainPageData(prevMainPageData => {
        const needGroup = prevMainPageData.groups.find(group => group.id === fileConfirmation.groupId);
        if (needGroup) {
          const lastMessage = needGroup.lastMessage;
          console.log(lastMessage.id);
          console.log(fileConfirmation.previousId);
          console.log(fileConfirmation.id);
          console.log((lastMessage && lastMessage.id === fileConfirmation.previousId) ? true : false);
          if (lastMessage && lastMessage.id === fileConfirmation.previousId) {
            lastMessage.id = fileConfirmation.id;
            lastMessage.sendDate = fileConfirmation.sendDate;
            lastMessage.isConfirmed = true;
            console.log(lastMessage);
          }
        }
        return {...prevMainPageData};
      });
    });
  }
  function handleReceiveFileConfirmationsFoo2(fileConfirmations) {
    if (fileConfirmations.length > 0) {
      const formData = new FormData();
      fileConfirmations.forEach(fileConfirmation => {
        console.log(fileConfirmation.previousId);
        console.log(fileConfirmation.contentId);
        setSentFiles(prevSentFiles => {
          const needFile =
            prevSentFiles.find(file => path.basename(file.name, path.extname(file.name)) === fileConfirmation.previousId);
          const newPrevSentFiles =
            prevSentFiles.filter(file => file !== needFile);
          if (needFile) {
            const blob = needFile.slice(0, needFile.size, needFile.type);
            formData.append("files",
              new File([blob], `${fileConfirmation.contentId}${path.extname(needFile.name)}`, { type: needFile.type }));
            // needFile.name = `${fileConfirmation.contentId}${path.extname(needFile.name)}`;
          }
          return [ ...newPrevSentFiles ];
        });
        setGroupData(prevGroupData => {
          const needFile = prevGroupData.sentFiles.find(file => file.id === fileConfirmation.previousId);
          if (needFile) {
            needFile.id = fileConfirmation.id;
            needFile.sendDate = fileConfirmation.sendDate;
            needFile.contentId = fileConfirmation.contentId;
            needFile.isConfirmed = true;
          }
          return {...prevGroupData};
        });
        setMainPageData(prevMainPageData => {
          const needGroup = prevMainPageData.groups.find(group => group.id === fileConfirmation.groupId);
          if (needGroup) {
            const lastMessage = needGroup.lastMessage;
            if (lastMessage && lastMessage.id == fileConfirmation.previousId) {
              lastMessage.id = fileConfirmation.id;
              lastMessage.sendDate = fileConfirmation.sendDate;
              lastMessage.isConfirmed = true;
            }
          }
          return {...prevMainPageData};
        });
      });
      fileApi.sendNewFiles(formData);
    }
  }
  function handleSubmitSendFiles(event, files) {
    if (files) {
      const formData = new FormData();
      const newFileModels = [];
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
        const messageModelId = uuidv4();
        newFileModels.push(new NewFileModel(messageModelId));
        const messageModel = new MessageModel(messageModelId,
          files[i].name,
          new Date(Date.now()),
          groupData.id,
          new SimpleUserModel(
            mainPageData.id,
            mainPageData.email,
            mainPageData.imageName,
          ),
        false);
        setGroupData(prevGroupData => {
          prevGroupData.sentFiles.push(messageModel);
          return { ...prevGroupData };
        });
        setMainPageData(prevMainPageData => {
          const needGroup = prevMainPageData.groups.find(group => group.id === groupData.id);
          if (needGroup) {
            needGroup.lastMessage = messageModel;
          }
          return { ...prevMainPageData };
        });
      };
      const newFilesModel = new NewFilesModel(newFileModels, groupData.id);
      fileApi.sendNewFiles(formData, superMessengerHub.addFiles, newFilesModel);
    }
    event.preventDefault();
  }
  /*
  function handleSubmitSendFiles2(event, files) {
    const newFilesModels = [];
    for (let i = 0; i < files.length; i++) {
      const fileId = uuidv4();
      const fileName = files[i].name;
      const fileType = files[i].type;
      const newFile = new MessageFileModel(
        fileId,
        fileName,
        fileId,
        new Date(Date.now()),
        groupData.id,
        new SimpleUserModel(
          mainPageData.id,
          mainPageData.email,
          mainPageData.imageName
        ),
        false
      );
      setGroupData(prevGroupData => {
        prevGroupData.sentFiles.push(newFile);
        return { ...prevGroupData };
      });
      setMainPageData(prevMainPageData => {
        const lastMessage = new MessageModel(newFile.id,
          newFile.name,
          newFile.sendDate,
          newFile.groupId,
          newFile.user,
          false)
        prevMainPageData.groups.find(group => group.id === newFile.groupId).lastMessage = lastMessage;
        return {...prevMainPageData};
      });
      const blob = files[i].slice(0, files[i].size, fileType); 
      setSentFiles(prevSentFiles => [...prevSentFiles,
        new File(
          [blob],
          `${fileId}${path.extname(fileName)}`,
          { type: fileType }
        )]
      );
      newFilesModels.push(new NewFilesModel(fileId, groupData.id, fileName, fileType));
    }
    superMessengerHub.addFiles(newFilesModels);
    event.preventDefault();
  }
  function handleSubmitSendFilesFoo(event, newFileModel) {
    console.log(newFileModel);
    const formData = new FormData();
    for (let i = 0; i < newFileModel.files.length; i++) {
      console.log(newFileModel.files[i]);
      const fileId = uuidv4();
      const newFile = new MessageFileModel(
        fileId,
        newFileModel.files[i].name,
        undefined,
        new Date(Date.now()),
        groupData.id,
        new SimpleUserModel(
          mainPageData.id,
          mainPageData.email,
          mainPageData.imageName
        ),
        false
      );
      setGroupData(prevGroupData => {
        prevGroupData.sentFiles.push(newFile);
        return { ...prevGroupData };
      });
      setMainPageData(prevMainPageData => {
        const lastMessage = new MessageModel(newFile.id,
          newFile.name,
          newFile.sendDate,
          newFile.groupId,
          newFile.user,
          false)
        prevMainPageData.groups.find(group => group.id === newFile.groupId).lastMessage = lastMessage;
        return {...prevMainPageData};
      });
      formData.append("Files", newFileModel.files[i]);
      formData.append("PreviousIds", fileId);
    }
    formData.append("GroupId", newFileModel.groupId);
    fileApi.sendNewFiles(formData);
    // api.current.sendNewFiles(newFileModel);
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  */
  // function handleClickDownloadFile() {
  //   api.current.downloadFile("");
  // }
  const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef);
  // function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          handleClickCloseModal();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [wrapperRef, openModals]);
  // }

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
          userManager={userManager}
          mainPageData={mainPageData}
          onClickOpenAcceptInvitations={handleClickOpenAcceptInvitations}
          onClickRenderSearchNoMyGroupsModal={handleRenderSearchGroupToApplicationModal}
          onClickCreateGroup={handleClickCreateGroup}
          onClickChangeProfile={handleClickChangeProfile}
          // onClickDownloadFile={handleClickDownloadFile}
          // onFoo={handleFoo}
        />
        <MainPage
          api={api}
          mainPageData={mainPageData}
          groupData={groupData}
          onClickSelectedGroup={handleClickSelectedGroup}
          onSubmitSendMessage={handleSubmitSendMessage}
          showGroupInfo={showGroupInfo}
          onClickShowGroupInfo={handleClickShowGroupInfo}
          onClickNewMember={handleClickNewMember}
          foundUsers={foundUsers}
          onChangeSearchNoInvitedUsers={handleChangeSearchNoInvitedUsers}
          renderNewMemberModal={renderNewMemberModal}
          onClickRenderNewMemberModal={handleClickRenderNewMemberModal}
          // onClickCloseNewMemberModal={handleClickRenderNewMemberModal}
          renderAddInvitationModal={renderAddInvitationModal}
          onClickSelectedUser={handleClickSelectedUser}
          onSubmitAddInvitation={handleSubmitAddInvitation}
          selectedUser={selectedUser}
          sendingResult={sendingResult}
          renderSendingResult={renderSendingResult}
          // onClickBackFromInvitationSendingResult={handleClickBackFromModal}
          // onClickCloseFromInvitationSendingResult={handleClickCloseFromInvitationSendingResult}
          myInvitations={myInvitations}
          renderMyInvitations={renderMyInvitations}
          onClickOpenAcceptInvitation={handleClickOpenAcceptInvitation}
          renderMyInvitation={renderMyInvitation}
          selectedInvitation={selectedInvitation}
          onClickAcceptInvitation={handleClickAcceptInvitation}
          onClickDeclineInvitation={handleClickDeclineInvitation}
          onSubmitAddApplication={handleSubmitAddApplication}
          onChangeSearchGroupToApplicationModal={handleChangeSearchNoMyGroups}
          onClickSelectedGroupModal={handleClickSelectedGroupModal}
          foundGroups={foundGroups}
          selectedGroupId={selectedGroupId}
          renderAddApplication={renderAddApplication}
          renderSearchGroupToApplicationModal={renderSearchGroupToApplicationModal}
          renderGroupApplication={renderGroupApplication}
          renderGroupApplications={renderGroupApplications}
          selectedApplication={selectedApplication}
          onClickOpenAcceptApplication={handleClickOpenAcceptApplication}
          onClickAcceptApplication={handleClickAcceptApplication}
          onClickDeclineApplication={handleClickDeclineApplication}
          onClickOpenAcceptApplications={handleClickOpenAcceptApplications}
          myApplications={myApplications}
          canUseGroupName={canUseGroupName}
          renderCreateGroup={renderCreateGroup}
          onCheckGroupName={handleCheckGroupName}
          onSubmitCreateGroup={handleSubmitCreateGroup}
          onSubmitChangeProfile={handleSubmitChangeProfile}
          renderChangeProfile={renderChangeProfile}
          onSubmitSendFiles={handleSubmitSendFiles}
          wrapperRef={wrapperRef}
          onClickBackModal={handleClickBackModal}
          renderConfirmation={renderConfirmation}
          confirmationType={confirmationType}
          onClickLeaveGroup={handleClickLeaveGroup}
          onAcceptConfirmation={handleAcceptConfirmation}
          onRejectConfirmation={handleRejectConfirmation}
          onClickRemoveGroup={handleClickRemoveGroup}
          renderLoader={renderLoader}
          onChangeSearchUsers = {handleChangeSearchUsers}
        />
        {/* <button
          onClick={receiveMessage}>
          get first data23
        </button>
        <button, set
          onClick={api ? api.foo : console.log("fuck")}>
          get first data23
        </button> */}
        {/* <p onClick={console.log(userManager)}>good job</p> */}
      </Div>
    );
  }
}