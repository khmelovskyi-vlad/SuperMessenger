import React, {useState, useEffect, useRef} from 'react';
import Oidc from "oidc-client"
// import { render } from '@testing-library/react';
import Navbar from './Organisms/Navbar';
import MainPage from './Organisms/MainPage';
import Api from '../Api';
import MainPageData from '../Models/MainPageData';
import GroupData from '../Models/GroupData';
import MessageModel from '../Models/MessageModel';
import { v4 as uuidv4 } from 'uuid';
import SimpleUserModel from '../Models/SimpleUserModel';
import SendingInvitationResult from '../SendingInvitationResult';
import Invitation from '../Models/Invitation';
import PreviousOpenModalType from '../PreviousOpenModalType';
import { animateScroll } from "react-scroll";
import Application from '../Models/Application';

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
  const [previousOpenModalType, setPreviousOpenModalType] = useState("");
  
  const [renderAddApplication, setRenderAddApplication] = useState(false);
  const [renderSearchGroupToApplicationModal, setRenderSearchGroupToApplicationModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [foundGroups, setFoundGroups] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [renderGroupApplication, setRenderGroupApplication] = useState(false);
  const [renderGroupApplications, setRenderGroupApplications] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(new Application());
  const [renderCreateGroup, setRenderCreateGroup] = useState(false);
  // const [api, setApi] = useState(null);
  const api = useRef(new Api());
  useEffect(() => {
    async function someFun() {
      setIsLogin((await userManager.getUser().then(async (user) => {
        if (user) {
          await api.current.connectToHubs(user.access_token,
            handleReceiveMainPageData,
            handleReceiveFoundUsers,
            handleReceiveGroupData,
            handleReceiveSendingResultAddInvitation,
            handleReceiveInvitation,
            handleReceiveMyInvitations,
            handleReceiveSendingResultAcceptInvitation,
            handleReceiveSendingResultDeclineInvitation,
            handleReceiveMessage,
          
            handleReceiveSendingResultAddApplication,
            handleReceiveApplication,
            handleReceiveMyApplications,
            handleReceiveSendingResultAcceptApplication,
            handleReceiveSendingResultDeclineApplication,
            handleReceiveFoundGroups,
            handleReceiveApplicationConfirmation,
            handleReceiveNewGroupUser,
            handleReceiveCheckGroupNamePartResult,
            handleReceiveGroup);
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

  function handleClickOpenAcceptApplications(applications) {
    // api.current.sendMyInvitation();
    setMyApplications(applications);
    setRenderGroupApplications(true);
    setPreviousOpenModalType(PreviousOpenModalType.acceptApplications);
  }
  function handleClickDeclineApplication(e, application) {
    setRenderSendingResult(true);
    api.current.declineInvitation(application);
    setRenderGroupApplication(false);
    // api.current.sendInvitation(invitation);
    // setFoundUsers([]);
  }
  function handleClickOpenAcceptApplication(application) {
    setSelectedApplication(application);
    setRenderGroupApplications(false);
    setRenderGroupApplication(true);
    setPreviousOpenModalType(PreviousOpenModalType.acceptApplication);
  }
  function handleClickAcceptApplication(e, application) {
    setRenderSendingResult(true);
    api.current.acceptApplication(application);
    setRenderGroupApplication(false);
    // api.current.sendInvitation(invitation);
    // setFoundUsers([]);
  }

  function handleReceiveFoundGroups(foundGroups) {
    setFoundGroups(foundGroups);
  }
  function handleClickRenderSearchNoMyGroupsModal() {
    setRenderSearchGroupToApplicationModal(prevRenderAddApplication => !prevRenderAddApplication);
    // setRenderAddInvitationModal(true);
  }
  function handleClickSelectedGroupModal(selectedGroupId) {
    setSelectedGroupId(selectedGroupId);
    // setRenderNewMemberModal(prevRenderNewMemberModal => !prevRenderNewMemberModal);
    setRenderSearchGroupToApplicationModal(false);
    // setRenderAddInvitationModal(prevRenderAddInvitationModal => !prevRenderAddInvitationModal);
    setRenderAddApplication(true);
    setPreviousOpenModalType(PreviousOpenModalType.searchGroupToApplication);
  }

  function handleChangeSearchNoMyGroups(e) {
    api.current.searchNoMyGroups(e.target.value);
  }
  function handleSubmitAddApplication(e, application) {
    // setRenderAddInvitationModal(prevRenderAddInvitationModal => !prevRenderAddInvitationModal);
    setRenderAddApplication(false);
    api.current.sendApplication(application);
    setFoundGroups([]);
    setRenderSendingResult(true);
    // e.target.reset();
  }



  function handleReceiveMyInvitations(invitations) {
    setMyInvitations(invitations)
  }
  function handleReceiveMyApplications(applications) {
    setMyApplications(applications)
  }
  function handleClickOpenAcceptInvitations() {
    api.current.sendMyInvitation();
    setRenderMyInvitations(true);
    setPreviousOpenModalType(PreviousOpenModalType.acceptInvitations);
  }
  function handleClickOpenAcceptInvitation(invitation) {
    setSelectedInvitation(invitation);
    setRenderMyInvitations(false);
    setRenderMyInvitation(true);
    setPreviousOpenModalType(PreviousOpenModalType.acceptInvitation);
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
  function handleClickBackFromModal() {
    switch (previousOpenModalType) {
    case PreviousOpenModalType.addInvitation:
      setRenderSendingResult(false);
      setSendingResult("");
      setRenderNewMemberModal(true);
      break;
    case PreviousOpenModalType.acceptInvitation:
      setRenderSendingResult(false);
      setSendingResult("");
      setRenderMyInvitations(true);
      break;
    case PreviousOpenModalType.acceptInvitations:
      break;
    default:
      break;
  }
  }
  function handleClickCloseFromInvitationSendingResult() {
    setRenderSendingResult(false);
    setSendingResult("");
  }
  function handleReceiveGroup(group) {
    setMainPageData(prevMainPageData => {
      prevMainPageData.groups.push(group);
      return {...prevMainPageData};
    });
  }
  function handleReceiveSendingResultAddInvitation(sendingResult) {
    if (SendingInvitationResult.successSenting === sendingResult) {
      setSendingResult("Invitation sent");
    } else if (SendingInvitationResult.isInGroup === sendingResult){
      setSendingResult("This user is in the group");
    } else if (SendingInvitationResult.wasInvited === sendingResult) { 
      setSendingResult("You have already invited this user");
    } else {
    }
  }
  function handleReceiveSendingResultAddApplication(sendingResult) {
    console.log(sendingResult);
  }
  function handleReceiveSendingResultAcceptInvitation(sendingResult, group) {
    // console.log(sendingResult);
    // console.log(group);
    if (SendingInvitationResult.successAccepting === sendingResult) {
      setMainPageData(prevMainPageData => {
        prevMainPageData.groups.push(group);
        return {...prevMainPageData};
      });
      setSendingResult("Invitation accept");
    } else {
    }
  }
  function handleReceiveApplicationConfirmation(group) {
    setMainPageData(prevMainPageData => {
      prevMainPageData.groups.push(group);
      return {...prevMainPageData};
    });
  }
  function handleReceiveNewGroupUser(simpleUser, userInGroup, groupId){
    setGroupData(prevGroupData => {
      if (prevGroupData.id === groupId) {
        prevGroupData.usersInGroup.push(userInGroup);
      }
      return {...prevGroupData};
    });
  }
  function handleReceiveSendingResultAcceptApplication(sendingResult) {
    // console.log(sendingResult);
    // console.log(group);
    if (SendingInvitationResult.successAcceptingApplication === sendingResult) {
      setSendingResult("Application accept");
    } else {
    }
  }
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
    // myInvitations.push(invitation);
    const myInvitationsCope = myInvitations.slice();
    myInvitationsCope.push(invitation);
    setMyInvitations(myInvitationsCope);
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
    const myApplicationsCope = myApplications.slice();
    myApplicationsCope.push(application);
    setMyApplications(myApplicationsCope);
  }
  function handleClickRenderNewMemberModal() {
    setRenderNewMemberModal(prevRenderNewMemberModal => !prevRenderNewMemberModal);
    // setRenderAddInvitationModal(true);
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
  function handleClickSelectedUser(selectedUser) {
    setSelectedUser(selectedUser);
    // setRenderNewMemberModal(prevRenderNewMemberModal => !prevRenderNewMemberModal);
    setRenderNewMemberModal(false);
    // setRenderAddInvitationModal(prevRenderAddInvitationModal => !prevRenderAddInvitationModal);
    setRenderAddInvitationModal(true);
    setPreviousOpenModalType(PreviousOpenModalType.addInvitation);
  }
  function handleSubmitAddInvitation(e, invitation) {
    // setRenderAddInvitationModal(prevRenderAddInvitationModal => !prevRenderAddInvitationModal);
    setRenderAddInvitationModal(false);
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
    message.id = uuidv4();
    // message.sendDate = new Date();
    message.sendDate = new Date(Date.now());
    setGroupData(prevGroupData => {
      prevGroupData.messages.push(message);
      return {...prevGroupData};
    });
    if (message.value.length > 0) {
      api.current.sendMessage(message);
      event.target.reset();
    }
    event.preventDefault();
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
  function handleClickShowGroupInfo(){
    setShowGroupInfo(prevShowGroupInfo => !prevShowGroupInfo);
  }
  function handleClickNewMember() {
    
  }
  function handleChangeNewMemberModal(e) {
    api.current.searchUsers(e.target.value);
  }
  function handleClickAcceptInvitation(e, invitation) {
    setRenderSendingResult(true);
    api.current.acceptInvitation(invitation);
    setRenderMyInvitation(false);
    // api.current.sendInvitation(invitation);
    // setFoundUsers([]);
  }
  function handleClickDeclineInvitation(e, invitation) {
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
  function handleSubmitCreateGroup(event, formData, groupType, groupName, invitations) {
    if (groupType.length > 0 && groupName.length > 0) {
      console.log("can create");
      if (groupType === "public" || groupType === "private") {
        formData.append("GroupName", groupName);
      }
      formData.append("GroupType", groupType);
      formData.append("InvitationsJson", JSON.stringify(invitations));
      for (let i = 0; i < invitations.length; i++){
        formData.append("Invitations", JSON.stringify(invitations[i]));
      }
      formData.append("Invitations2", JSON.stringify(invitations));
      formData.append("Invitations3", invitations);
      console.log(invitations);
      console.log(formData.getAll("Invitations"));
      // api.current.sendNewGroup(formData, invitations);
      api.current.sendNewGroup(formData, invitations);
    }
    event.preventDefault();
  }
  function handleClickCreateGroup() {
    setRenderCreateGroup(true);
  }
  const [renderChangeProfile, setRenderChangeProfile] = useState(false);
  function handleClickChangeProfile() {
    setRenderChangeProfile(true);
  }
  function handleSubmitChangeProfile(event, myFirstName, myLastName, avatar) {
    console.log("good job")
    const formData = new FormData();
    formData.append("FirstName", myFirstName);
    formData.append("LastName", myLastName);
    formData.append("Avatar", avatar);
    api.current.changeProfile(formData);
    
    event.preventDefault();
  }
  function handleSubmitSendFiles(event, newFileModel) {
    console.log(newFileModel);
    const formData = new FormData();
    for (let i = 0; i < newFileModel.files.length; i++) {
      formData.append("Files", newFileModel.files[i]);
    }
    formData.append("GroupId", newFileModel.groupId);
    api.current.sendNewFiles(formData);
    // api.current.sendNewFiles(newFileModel);
    event.preventDefault();
  }
  return (
    <div>
      {/* <p onClick={() => userManager.getUser().then((user) =>{
        if (user) {
          console.log("isLogin");
        }
        else {
          console.log("notLogin");
        }
      })}>is login?</p> */}
      <Navbar
        isLogin={isLogin}
        userManager={userManager}
        mainPageData={mainPageData}
        onClickOpenAcceptInvitations={handleClickOpenAcceptInvitations}
        onClickRenderSearchNoMyGroupsModal={handleClickRenderSearchNoMyGroupsModal}
        onClickCreateGroup={handleClickCreateGroup}
        onClickChangeProfile={handleClickChangeProfile}
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
        renderAddInvitationModal={renderAddInvitationModal}
        onClickSelectedUser={handleClickSelectedUser}
        onSubmitAddInvitation={handleSubmitAddInvitation}
        selectedUser={selectedUser}
        sendingResult={sendingResult}
        renderSendingResult={renderSendingResult}
        onClickBackFromInvitationSendingResult={handleClickBackFromModal}
        onClickCloseFromInvitationSendingResult={handleClickCloseFromInvitationSendingResult}
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
    </div>
  );
}