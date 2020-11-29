import React, {useState, useEffect, useRef, useCallback} from 'react';
import Oidc from "oidc-client"
// import { render } from '@testing-library/react';
import Navbar from '../components/organisms/Navbar';
import MainPage from '../components/organisms/MainPage';
import Api from '../Api';
import MainPageData from '../containers/Models/MainPageData';
import GroupData from '../containers/Models/GroupData';
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
import UserResultType from '../containers/Enums/UserResultType';
import FileFormModel from '../containers/Models/FileFormModel';
import SentFileModel from '../containers/Models/SentFileModel';
import NewGroupModel from '../containers/Models/NewGroupModel';
import GroupImgModel from '../containers/Models/GroupImgModel';

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
  const [mainPageData, setMainPageData] = useState(new MainPageData());
  const [groupData, setGroupData] = useState(new GroupData());
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
  const [openModalType, setOpenModalType] = useState("");
  const [previousOpenModalType, setPreviousOpenModalType] = useState([]);
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
  const [groupImgModels, setGroupImgModels] = useState([]);
  // const [api, setApi] = useState(null);
  const api = useRef(new Api());
  useEffect(() => {
    async function someFun() {
      setIsLogin((await userManager.getUser().then(async (user) => {
        if (user) {
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
            handleReceiveUserResultType,
            handleReceiveMessageConfirmation,
            handleReceiveFileConfirmations,
            handleReceiveFiles,
            handleReduceMyInvitationsCount,
            handleReduceMyApplicationsCount,
            handleReduceGroupApplication,
            handleIncreaseMyApplicationsCount,
            handleReduceMyInvitations,
            handleSendGroupImage);
          api.current.sendFirstData();
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
  function handleReduceMyInvitations(invitationModels) {
    if (myInvitations != []) {
      setMyInvitations(prevMyInvitations => {
        invitationModels.forEach(invitationModel => {
          if (prevMyInvitations) {
            const prevMyInvitationsCope = prevMyInvitations
            .filter(invitation => invitation.simpleGroup.id === invitationModel.simpleGroup.id
              && invitation.invitedUser.id === invitationModel.invitedUser.id
              && invitation.inviter.id === invitationModel.inviter.id ? false : true);
            prevMyInvitations = prevMyInvitationsCope;
            console.log(prevMyInvitationsCope);
          }
        });
        return [...prevMyInvitations]
      });
    }
    const invitationsCount = invitationModels.length;
    console.log(invitationsCount);
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
    setOpenModalType(ModalType.acceptApplications);
    // api.current.sendMyInvitation();
    setMyApplications(applications);
    setRenderGroupApplications(true);
  }
  
  function handleClickDeclineApplication(e, application) {
    setOpenModals(prev => [...prev, ModalType.renderResult])
    setRenderSendingResult(true);
    api.current.rejectApplication(application);
    setRenderGroupApplication(false);
    // api.current.sendInvitation(invitation);
    // setFoundUsers([]);
  }
  function handleClickOpenAcceptApplication(application) {
    setOpenModals(prev => [...prev, ModalType.acceptApplication])
    setPreviousOpenModalType(prev => [...prev, ModalType.acceptApplications])
    setOpenModalType(ModalType.acceptApplication);
    setSelectedApplication(application);
    setRenderGroupApplications(false);
    setRenderGroupApplication(true);
  }
  function handleClickAcceptApplication(e, application) {
    setOpenModals(prev => [...prev, ModalType.renderResult])
    setRenderSendingResult(true);
    api.current.acceptApplication(application);
    setRenderGroupApplication(false);
    // api.current.sendInvitation(invitation);
    // setFoundUsers([]);
  }

  function handleReceiveFoundGroups(foundGroups) {
    setFoundGroups(foundGroups);
  }
  function handleRenderSearchGroupToApplicationModal() {
    setOpenModals(prev => [...prev, ModalType.searchGroupToApplication])
    setOpenModalType(ModalType.searchGroupToApplication);
    setRenderSearchGroupToApplicationModal(prevRenderAddApplication => !prevRenderAddApplication);
    // setRenderAddInvitationModal(true);
  }
  function handleClickSelectedGroupModal(selectedGroupId) {
    setOpenModals(prev => [...prev, ModalType.addApplication])
    setPreviousOpenModalType(prev => [...prev, ModalType.searchGroupToApplication])
    setOpenModalType(ModalType.addApplication);
    setSelectedGroupId(selectedGroupId);
    setRenderSearchGroupToApplicationModal(false);
    setRenderAddApplication(true);
  }

  function handleChangeSearchNoMyGroups(e) {
    api.current.searchNoMyGroups(e.target.value);
  }
  function handleSubmitAddApplication(e, application) {
    setOpenModals(prev => [...prev, ModalType.renderResult])
    setPreviousOpenModalType(prev => [...prev, ModalType.addApplication])
    setOpenModalType(ModalType.renderResult);
    setRenderAddApplication(false);
    api.current.sendApplication(application);
    setFoundGroups([]);
    setRenderSendingResult(true);
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
    setOpenModalType(ModalType.acceptInvitations);
    api.current.sendMyInvitations();
    setRenderMyInvitations(true);
  }
  function handleClickOpenAcceptInvitation(invitation) {
    setOpenModals(prev => [...prev, ModalType.acceptInvitation])
    setOpenModalType(ModalType.acceptInvitation);
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
//handleClickBackFromInvitationSendingResult
  // function handleClickBackFromModal() {
  //   switch (openModalType) {
  //   case ModalType.addInvitation:
  //     setRenderSendingResult(false);
  //     setSendingResult("");
  //     setRenderNewMemberModal(true);
  //     break;
  //   case ModalType.acceptInvitation:
  //     setRenderSendingResult(false);
  //     setSendingResult("");
  //     setRenderMyInvitations(true);
  //     break;
  //   case ModalType.acceptInvitations:
  //     break;
  //   default:
  //     break;
  // }
  // }
  function openNeedModal(modalType) {
    switch (modalType) {
      case ModalType.renderResult:
        setRenderSendingResult(true);
        break;
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
      const changeOpenModals = true;
      switch (lastModel) {
        case ModalType.renderResult:
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
      const cleanOpenModals = true;
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
  // function handleClickCloseFromInvitationSendingResult() {
  //   setOpenModalType("");
  //   setRenderSendingResult(false);
  //   setSendingResult("");
  // }
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
  // function handleReceiveGroup(group) {
  //   setMainPageData(prevMainPageData => {
  //     prevMainPageData.groups.push(group);
  //     return {...prevMainPageData};
  //   });
  // }
  // function handleReceiveSendingResultAddInvitation(sendingResult) {
  //   console.log(sendingResult);
  //   if (SendingInvitationResult.successSenting === sendingResult) {
  //     setSendingResult("Invitation sent");
  //   } else if (SendingInvitationResult.isInGroup === sendingResult){
  //     setSendingResult("This user is in the group");
  //   } else if (SendingInvitationResult.wasInvited === sendingResult) { 
  //     setSendingResult("You have already invited this user");
  //   } else {
  //   }
  // }
  function handleReceiveUserResultType(resultType) {
    switch (resultType) {
      case UserResultType.successProfileChange:
        setSendingResult("Profile was successfully changed");
        break;
    }
  }
  function handleReceiveApplicationResultType(resultType) {
    switch (resultType) {
      case ApplicationResultType.wasSentEarlier:
        setSendingResult("The application was sent earlier");
        break;
      case ApplicationResultType.youAreInGroup:
        setSendingResult("You are in thr group");
        break;
      case ApplicationResultType.successSubmitted:
        setSendingResult("The application was successfully submitted");
        break;
      // case ApplicationResultType.userIsInGroup:
      //   setSendingResult("User is in the group");
      //   break;
      case ApplicationResultType.successAccepting:
        setSendingResult("The application was successfully accepted");
        break;
      case InvitationResultType.successRejecting:
        setSendingResult("The application was successfully rejected");
        break;
      case ApplicationResultType.notHaveApplication:
        setSendingResult("No have the application");
        break;
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
      case InvitationResultType.notHaveInvitation:
        setSendingResult("Don't have the invitation");
        break;
      case InvitationResultType.successAccepting:
        setSendingResult("The invitation was successfully accepted");
        break;
      case InvitationResultType.successDeclining:
        setSendingResult("The invitation was successfully declined");
        break;
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
      case GroupResultType.successAdded:
        setSendingResult("The group was successfully added");
        break;
      case GroupResultType.invalidName:
        setSendingResult("Invalid group name");
        break;
      case GroupResultType.successLeft:
        setSendingResult("The group was successfully left");
        break;
      case GroupResultType.noLeft:
        setSendingResult("The group wasn't left");
        break;
      case GroupResultType.successRemoved:
        setSendingResult("The group was successfully removed");
        break;
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
        const users = prevGroupData.usersInGroup.filter(user => user.Id !== userId);
        prevGroupData.usersInGroup = users;
      }
      return {...prevGroupData};
    });
  }
  function handleClickLeaveGroup() {
    setRenderConfirmation(true);
    setOpenModals(prev => [...prev, ModalType.confirmation])
    setConfirmationType(ConfirmationType.leavingGroup);
  }
  function handleAcceptConfirmation(e, confirmationType) {
    console.log(confirmationType)
    switch (confirmationType) {
      case ConfirmationType.leavingGroup:
        leaveGroup();
        break;
      default:
        break;
    }
  }
  function handleRejectConfirmation(e, confirmationType) {
    switch (confirmationType) {
      case ConfirmationType.leavingGroup:
        leaveGroup();
        break;
      default:
        break;
    }
  }
  function leaveGroup() {
    const groupId = groupData.id;
    setMainPageData(prevMainPageData => {
      const groups = prevMainPageData.groups.filter(group => group.id !== groupId);
      console.log(prevMainPageData);
      console.log(groups);
      prevMainPageData.groups = groups;
      return {...prevMainPageData};
    });
    console.log(mainPageData);
    setShowGroupInfo(false);
    api.current.leaveGroup(groupId);
    api.current.removeFromGroup(groupId);
    setGroupData(new GroupData());
    setRenderConfirmation(false);
    setConfirmationType(null);
    setOpenModals(prev => [...prev, ModalType.renderResult])
    setRenderSendingResult(true);
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
    setOpenModalType(ModalType.searchUser);
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
          file.name,
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
    setOpenModalType(ModalType.addInvitation);
    setSelectedUser(selectedUser);
    // setRenderNewMemberModal(prevRenderNewMemberModal => !prevRenderNewMemberModal);
    setRenderNewMemberModal(false);
    // setRenderAddInvitationModal(prevRenderAddInvitationModal => !prevRenderAddInvitationModal);
    setRenderAddInvitationModal(true);
  }
  function handleSubmitAddInvitation(e, invitation) {
    // setRenderAddInvitationModal(prevRenderAddInvitationModal => !prevRenderAddInvitationModal);
    setOpenModals(prev => [...prev, ModalType.renderResult])
    setOpenModalType(ModalType.renderResult);
    setRenderAddInvitationModal(false);
    console.log(invitation);
    api.current.sendInvitation(invitation);
    setFoundUsers([]);
    setRenderSendingResult(true);
    // e.target.reset();
  }
  function handleClickSelectedGroup(groupId) {
    api.current.sendGroupData(groupId);
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
      api.current.sendMessage(message);
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
  function handleReceiveFileConfirmations(fileConfirmations) {
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
  function handleReceiveNewProfile(profile) {
    setMainPageData(prevMainPageData => {
      prevMainPageData.imageId = profile.imageId;
      prevMainPageData.firstName = profile.firstName;
      prevMainPageData.lastName = profile.lastName;
    console.log("super");
      return { ...prevMainPageData };
    });
    setGroupData(prevGroupData => {
      if (prevGroupData.usersInGroup) {
        prevGroupData.usersInGroup.find(user => user.id === profile.id).imageId = profile.imageId;
    console.log("super");
      }
      return { ...prevGroupData };
    });
    console.log("super");
  }
  function handleReceiveNewUserData(user) {
    setGroupData(prevGroupData => {
      if (prevGroupData.usersInGroup) {
        const needUser = prevGroupData.usersInGroup.find(u => u.id === user.id);
        if (needUser) {
          needUser.imageId = user.imageId;
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
  function handleChangeNewMemberModal(e) {
    api.current.searchUsers(e.target.value);
  }
  function handleClickAcceptInvitation(e, invitation) {
    setOpenModals(prev => [...prev, ModalType.renderResult])
    setRenderSendingResult(true);
    api.current.acceptInvitation(invitation);
    setRenderMyInvitation(false);
    // api.current.sendInvitation(invitation);
    // setFoundUsers([]);
  }
  function handleClickDeclineInvitation(e, invitation) {
    setOpenModals(prev => [...prev, ModalType.renderResult])
    setRenderSendingResult(true);
    api.current.declineInvitation(invitation);
    setRenderMyInvitation(false);
    // api.current.sendInvitation(invitation);
    // setFoundUsers([]);
  }
  function handleCheckGroupName(groupNamePart) {
    api.current.checkGroupNamePart(groupNamePart);
  }
  const [canUseGroupName, setCanUseGroupName] = useState(null);
  function handleReceiveCheckGroupNamePartResult(canUseGroupName) {
    setCanUseGroupName(canUseGroupName);
  }
  function handleSendGroupImage(newImageId, previousImageId) {
    let needGroupImgModel = null;
    setGroupImgModels(prevGroupImgModels => {
      needGroupImgModel = prevGroupImgModels.find(groupImg => groupImg.imageId === previousImageId);
      prevGroupImgModels = prevGroupImgModels.filter(groupImg => groupImg.imageId !== previousImageId);
      return { ...prevGroupImgModels };
    });
    if (needGroupImgModel != null) {
      const formData = new FormData();
      formData.append("groupImg", needGroupImgModel.groupImg);
      formData.append("imageId", newImageId);
      api.current.sendNewGroup(formData);
    }
  }
  function handleSubmitCreateGroup(event, groupImg, groupType, groupName, invitations) {
    if (groupType.length > 0 && groupName.length > 0) {
      console.log("can create");
      const newGroupModel = new NewGroupModel();
      setOpenModals(prev => [...prev, ModalType.renderResult])
      setRenderSendingResult(true);
      setRenderCreateGroup(false);
      if (groupType === "public" || groupType === "private") {
        newGroupModel.name = groupName;
      }
      newGroupModel.type = groupType;
      newGroupModel.invitations = invitations;
      if (groupImg) {
        const previousImageId = uuidv4();
        newGroupModel.haveImage = true;
        newGroupModel.previousImageId = previousImageId;
        const newGroupImgModel = new GroupImgModel(groupImg, previousImageId);
        setGroupImgModels( prevGroupImgModels => [ ...prevGroupImgModels, newGroupImgModel] );
      }
      else {
        newGroupModel.haveImage = false;
      }
      api.current.createGroup(newGroupModel);
    }
    event.preventDefault();
    return false;
  }
  // function handleSubmitCreateGroup(event, formData, groupType, groupName, invitations) {
  //   if (groupType.length > 0 && groupName.length > 0) {
  //     setOpenModals(prev => [...prev, ModalType.renderResult])
  //     setPreviousOpenModalType(prev => [...prev, ModalType.acceptApplications])
  //     setOpenModalType(ModalType.renderResult);
  //     setRenderSendingResult(true);
  //     setRenderCreateGroup(false);
  //     console.log("can create");
  //     if (groupType === "public" || groupType === "private") {
  //       formData.append("GroupName", groupName);
  //     }
  //     formData.append("GroupType", groupType);
  //     formData.append("InvitationsJson", JSON.stringify(invitations));
  //     for (let i = 0; i < invitations.length; i++){
  //       formData.append("Invitations", JSON.stringify(invitations[i]));
  //     }
  //     formData.append("Invitations2", JSON.stringify(invitations));
  //     formData.append("Invitations3", invitations);
  //     console.log(invitations);
  //     console.log(formData.getAll("Invitations"));
  //     // api.current.sendNewGroup(formData, invitations);
  //     api.current.sendNewGroup(formData, invitations);
  //   }
  //   event.preventDefault();
  //   return null;
  // }
  function handleClickCreateGroup() {
    setOpenModals(prev => [...prev, ModalType.createGroup])
    setOpenModalType(ModalType.createGroup);
    setRenderCreateGroup(true);
  }
  function handleClickChangeProfile() {
    setOpenModals(prev => [...prev, ModalType.changeProfile])
    setOpenModalType(ModalType.changeProfile);
    setRenderChangeProfile(true);
  }
  function handleSubmitChangeProfile(event, myFirstName, myLastName, avatar) {
    setRenderSendingResult(true);
    setRenderChangeProfile(false);
    console.log("good job")
    setOpenModals(prev => [...prev, ModalType.renderResult])
    setPreviousOpenModalType(prev => [...prev, ModalType.changeProfile])
    setOpenModalType(ModalType.renderResult);
    const formData = new FormData();
    formData.append("FirstName", myFirstName);
    formData.append("LastName", myLastName);
    formData.append("Avatar", avatar);
    api.current.changeProfile(formData);
    
    event.preventDefault();
    // return null;
  }
  function handleSubmitSendFiles(event, newFileModel) {
    console.log(newFileModel);
    const formData = new FormData();
    for (let i = 0; i < newFileModel.files.length; i++) {
      console.log(newFileModel.files[i]);
      const fileId = uuidv4();
      const newFile = new SentFileModel(
        fileId,
        newFileModel.files[i].name,
        undefined,
        new Date(Date.now()),
        groupData.id,
        new SimpleUserModel(
          mainPageData.id,
          mainPageData.email,
          mainPageData.imageId
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
    api.current.sendNewFiles(formData);
    // api.current.sendNewFiles(newFileModel);
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
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
        onChangeNewMemberModal={handleChangeNewMemberModal}
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