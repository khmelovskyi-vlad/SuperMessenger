import React, { useState, useEffect, useRef } from 'react';
import Oidc from "oidc-client"

import Navbar from '../components/templates/Navbar';
import MainPage from '../components/templates/MainPage';
import MainPageModel from '../containers/Models/MainPageModel';
import GroupModel from '../containers/Models/GroupModel';
import { stringify, v4 as uuidv4 } from 'uuid';
import SimpleUserModel from '../containers/Models/SimpleUserModel';
import InvitationModel from '../containers/Models/InvitationModel';
import ModalType from '../containers/Enums/ModalType';
import { animateScroll } from "react-scroll";
import ApplicationModel from '../containers/Models/ApplicationModel';
import Div from '../components/atoms/Div';
import ConfirmationType from '../containers/Enums/ConfirmationType';
import MessageFileModel from '../containers/Models/MessageFileModel';
import NewGroupModel from '../containers/Models/NewGroupModel';
import SuperMessengerHub from '../containers/Api/SignalR/SuperMessengerHub';
import GroupHub from '../containers/Api/SignalR/GroupHub';
import InvitationHub from '../containers/Api/SignalR/InvitationHub';
import ApplicationHub from '../containers/Api/SignalR/ApplicationHub';
import FileApi from '../containers/Api/FileApi';
import AppErrorHandler from '../containers/Api/AppErrorHandler';
import NewFilesModel from '../containers/Models/NewFilesModel';
import GroupType from '../containers/Enums/GroupType';
import NewProfileModel from '../containers/Models/NewProfileModel';
import NewFileModel from '../containers/Models/NewFileModel';
import {  , throttle} from 'lodash';


const config = {
authority: "https://localhost:44370",
client_id: "js",
redirect_uri: "https://localhost:44370/callback.html",
response_type: "id_token token",
scope: "openid profile api1",
post_logout_redirect_uri: "https://localhost:44370",
};


export default function Messenger() {
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
  const [selectedInvitation, setSelectedInvitation] = useState(new InvitationModel());
  const [openModals, setOpenModals] = useState([]);
  const [renderAddApplication, setRenderAddApplication] = useState(false);
  const [renderSearchGroupToApplicationModal, setRenderSearchGroupToApplicationModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [foundGroups, setFoundGroups] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [renderGroupApplication, setRenderGroupApplication] = useState(false);
  const [renderGroupApplications, setRenderGroupApplications] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(new ApplicationModel());
  const [renderCreateGroup, setRenderCreateGroup] = useState(false);
  const [renderChangeProfile, setRenderChangeProfile] = useState(false);
  const [renderConfirmation, setRenderConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState(null);
  const [renderLoader, setRenderLoader] = useState(false);
  const [renderMessageScrollButton, setRenderMessageScrollButton] = useState(false);
  const [canUseGroupName, setCanUseGroupName] = useState(null);
  
  const [error, setError] = useState(null);
  const appErrorHandler = new AppErrorHandler(setError);

  const [userManager, setUserManager] = useState(new Oidc.UserManager(config));
  const [superMessengerHub, setSuperMessengerHub] = useState(new SuperMessengerHub(appErrorHandler, handleReceiveSendingResult));
  const [groupHub, setGroupHub] = useState(new GroupHub(appErrorHandler, handleReceiveSendingResult));
  const [applicationHub, setApplicationHub] = useState(new ApplicationHub(appErrorHandler, handleReceiveSendingResult));
  const [invitationHub, setInvitationHub] = useState(new InvitationHub(appErrorHandler, handleReceiveSendingResult));
  const [fileApi, setFileApi] = useState(new FileApi(appErrorHandler));
  

  
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
            handleReceiveNewOwnerUserId,
            handleReceiveLeftGroupUserId,
            handleReceiveRomevedGroup,
            handleReceiveNewGroupUser,
          );
          await groupHub.connect(
            user.access_token,
            handleReceiveGroupData,
            handleReceiveNoMySearchedGroups,
            handleReceiveCheckGroupNamePartResult,
            handleReceiveSimpleGroup,
          );
          await applicationHub.connect(
            user.access_token,
            handleReceiveApplication,
            handleReduceMyApplicationsCount,
            handleReduceGroupApplication,
            handleIncreaseMyApplicationsCount,
          );
          await invitationHub.connect(
            user.access_token,
            handleReceiveInvitation,
            handleReceiveMyInvitations,
            handleReduceMyInvitations,
          );

          superMessengerHub.sendFirstData();
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
    if (myInvitations !== []) {
      setMyInvitations(prevMyInvitations => {
        reduceInvtationModels.forEach(reduceInvtationModel => {
          if (prevMyInvitations) {
            const prevMyInvitationsCope = prevMyInvitations
            .filter(invitation => invitation.group.id === reduceInvtationModel.groupId
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
        prevGroupData.applications = prevGroupData.applications.filter(application => application.user.id !== userId);
      }
      return { ...prevGroupData };
    });
  }
  
  function handleClickOpenAcceptApplications(applications) {
    setOpenModals(prev => [...prev, ModalType.acceptApplications])
    setMyApplications(applications);
    setRenderGroupApplications(true);
  }
  
  function handleClickDeclineApplication(e, application) {
    setOpenModals(prev => [...prev, ModalType.loader]);
    setRenderLoader(true);
    applicationHub.rejectApplication(application);
    setRenderGroupApplication(false);
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
  }

  function handleReceiveNoMySearchedGroups(foundGroups) {
    setFoundGroups(foundGroups);
  }
  function handleRenderSearchGroupToApplicationModal() {
    setOpenModals(prev => [...prev, ModalType.searchGroupToApplication])
    setRenderSearchGroupToApplicationModal(prevRenderAddApplication => !prevRenderAddApplication);
  }
  function handleClickSelectedGroupModal(selectedGroupId) {
    setOpenModals(prev => [...prev, ModalType.addApplication])
    setSelectedGroupId(selectedGroupId);
    setRenderSearchGroupToApplicationModal(false);
    setRenderAddApplication(true);
  }

  function handleChangeSearchNoMyGroups(e) {
		const debouncedSave = debounce(() => groupHub.searchNoMyGroups(e.target.value), 1000);
		debouncedSave();
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
    scrollToBottom("ChatMessages");
  }
  function scrollToBottom(id) {
    animateScroll.scrollToBottom({
      containerId: id,
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
  
  function handleReceiveNewGroupUser(userInGroup, groupId){
    setGroupData(prevGroupData => {
      if (prevGroupData.id === groupId) {
        prevGroupData.usersInGroup.push(userInGroup);
      }
      return {...prevGroupData};
    });
    
    setSelectedApplication(prevSelectedApplication => {
      if (prevSelectedApplication
        && prevSelectedApplication.groupId === groupId) {
        setRenderGroupApplication(false);
        return new ApplicationModel();
      }
      return { ...prevSelectedApplication };
    });
    setSelectedInvitation(prevSelectedInvitation => {
      if (prevSelectedInvitation
        && prevSelectedInvitation.group
        && prevSelectedInvitation.group.id === groupId) {
        setRenderMyInvitation(false);
        return new InvitationModel();
      }
      return { ...prevSelectedInvitation };
    });
  }

  function handleReceiveNewOwnerUserId(userId, groupId) {
    setGroupData(prevGroupData => {
      if (prevGroupData.id === groupId) {
        const user = prevGroupData.usersInGroup.find(user => user.id === userId);
        if (user) {
          user.isCreator = true;
        };
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
  
  
  function handleReceiveInvitation(invitation) {
    setMainPageData(prevMainPageData => {
      prevMainPageData.invitationCount++;
      return {...prevMainPageData};
    });
    setMyInvitations(prevMyInvitations => [...prevMyInvitations, invitation]);
  }
  function handleReceiveApplication(application) {
    setGroupData(prevGroupData => {
      if (prevGroupData.id === application.groupId) {
        prevGroupData.applications.push(application);
      }
        return { ...prevGroupData };
    })
  }
  function handleClickRenderNewMemberModal() {
    setOpenModals(prev => [...prev, ModalType.searchUser])
    setRenderNewMemberModal(true);
  }
  
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
          prevGroupData.messageFiles.push(file);
        }
        return {...prevGroupData};
      });
      setMainPageData(prevMainPageData => {
        prevMainPageData.groups.find(group => group.id === file.groupId).lastMessage = file;
        return {...prevMainPageData};
      });
    });
  }
  function handleClickSelectedUser(selectedUser) {
    setOpenModals(prev => [...prev, ModalType.addInvitation])
    setSelectedUser(selectedUser);
    setRenderNewMemberModal(false);
    setRenderAddInvitationModal(true);
  }
  function handleSubmitAddInvitation(e, invitation) {
    setRenderAddInvitationModal(false);
    invitationHub.sendInvitation(invitation);
    setFoundUsers([]);
    setOpenModals(prev => [...prev, ModalType.loader]);
    setRenderLoader(true);
  }
  function handleClickSelectedGroup(groupId) {
    groupHub.sendGroupData(groupId);
  }
  function handleSubmitSendMessage(event, message) {
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
  }
  useEffect(() => {
      console.log(renderMessageScrollButton);
    if(!renderMessageScrollButton){
      scrollToBottom("ChatMessages");
    }
  },  [groupData]);
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
        if (lastMessage && lastMessage.id === messageConfirmation.previousId) {
          lastMessage.id = messageConfirmation.id;
          lastMessage.sendDate = messageConfirmation.sendDate;
        }
      }
      return {...prevMainPageData};
    });
  }
  
  function handleReceiveNewUserData(user) {
    setGroupData(prevGroupData => {
      if (prevGroupData.usersInGroup) {
        const needUser = prevGroupData.usersInGroup.find(u => u.id === user.id);
        if (needUser) {
          needUser.imageName = user.imageName;
          needUser.email = user.email;
        }
      }
      return { ...prevGroupData };
    });
  }
  function handleClickShowGroupInfo(){
    setShowGroupInfo(prevShowGroupInfo => !prevShowGroupInfo);
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

  function handleReceiveCheckGroupNamePartResult(canUseGroupName) {
    setCanUseGroupName(canUseGroupName);
  }
  
  function handleSubmitCreateGroup(event, groupImg, groupType, groupName, invitations) {
    console.log();
    if (groupType.length <= 0
      || (groupType !== GroupType.chat && groupName.length > 0)
      || (groupType !== GroupType.chat && canUseGroupName)
      || (groupType === GroupType.chat && invitations.length === 1)) {
    console.log(groupType === GroupType.chat && invitations.length !== 1);
      const newGroupModel = new NewGroupModel();
      setOpenModals(prev => [...prev, ModalType.loader]);
      setRenderLoader(true);
      setRenderCreateGroup(false);
      newGroupModel.name = groupName;
      newGroupModel.type = groupType;
      newGroupModel.invitations = invitations;
      if (groupImg && groupType !== GroupType.chat) {
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
    if (haveNewAvatar || myFirstName.length !== 0 || myLastName.length !== 0) {
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
      return { ...prevMainPageData };
    });
    setGroupData(prevGroupData => {
      if (prevGroupData.usersInGroup) {
        prevGroupData.usersInGroup.find(user => user.id === profile.id).imageName = profile.imageName;
      }
      return { ...prevGroupData };
    });
  }
  function handleReceiveFileConfirmations(fileConfirmations) {
    fileConfirmations.forEach(fileConfirmation => {
      setGroupData(prevGroupData => {
        if (fileConfirmation.groupId === prevGroupData.id && prevGroupData.messageFiles) {
          const needFile = prevGroupData.messageFiles.find(file => file.id === fileConfirmation.previousId);
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
          if (lastMessage && lastMessage.id === fileConfirmation.previousId) {
            lastMessage.id = fileConfirmation.id;
            lastMessage.sendDate = fileConfirmation.sendDate;
            lastMessage.isConfirmed = true;
          }
        }
        return {...prevMainPageData};
      });
    });
  }
  function handleSubmitSendFiles(event, files) {
    if (files) {
      const formData = new FormData();
      const newFileModels = [];
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
        const messageModelId = uuidv4();
        newFileModels.push(new NewFileModel(messageModelId));
        const messageFileModel = new MessageFileModel(messageModelId,
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
          prevGroupData.messageFiles.push(messageFileModel);
          return { ...prevGroupData };
        });
        setMainPageData(prevMainPageData => {
          const needGroup = prevMainPageData.groups.find(group => group.id === groupData.id);
          if (needGroup) {
            needGroup.lastMessage = messageFileModel;
          }
          return { ...prevMainPageData };
        });
      };
      const newFilesModel = new NewFilesModel(newFileModels, groupData.id);
      fileApi.sendNewFiles(formData, superMessengerHub.addFiles, newFilesModel);
    }
    event.preventDefault();
  }
  function handleClickMessageScrollButton(){
    scrollToBottom("ChatMessages");
  }
  function handleScrollMessage(e) {
    debounceScrollMessage(e);
  }
  // const [scrollHeight, setScrollHeight] = useState(0);
  // const [scrollTop, setScrollTop] = useState(0);
  const debounceScrollMessage = debounce((e) => {
    // setScrollHeight(e.target.scrollHeight);
    // setScrollTop(e.target.scrollTop);
    if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight > e.target.scrollHeight / 10) {
      if (renderMessageScrollButton === false) {
        setRenderMessageScrollButton(true);
      }
    }
    else {
      if (renderMessageScrollButton === true) {
        setRenderMessageScrollButton(false);
      }
    }
  }, 100);

  const wrapperRef = useRef(null);
  useEffect(() => {
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          handleClickCloseModal();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [openModals]);


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
        />
        <MainPage
          mainPageData={mainPageData}
          groupData={groupData}
          onClickSelectedGroup={handleClickSelectedGroup}
          onSubmitSendMessage={handleSubmitSendMessage}
          showGroupInfo={showGroupInfo}
          onClickShowGroupInfo={handleClickShowGroupInfo}
          foundUsers={foundUsers}
          onChangeSearchNoInvitedUsers={handleChangeSearchNoInvitedUsers}
          renderNewMemberModal={renderNewMemberModal}
          onClickRenderNewMemberModal={handleClickRenderNewMemberModal}
          renderAddInvitationModal={renderAddInvitationModal}
          onClickSelectedUser={handleClickSelectedUser}
          onSubmitAddInvitation={handleSubmitAddInvitation}
          selectedUser={selectedUser}
          sendingResult={sendingResult}
          renderSendingResult={renderSendingResult}
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
          onChangeSearchUsers={handleChangeSearchUsers}
          onScrollMessage={handleScrollMessage}
          renderMessageScrollButton={renderMessageScrollButton}
          onClickMessageScrollButton={handleClickMessageScrollButton}
        />
      </Div>
    );
  }
}