import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { animateScroll } from 'react-scroll';
import { v4 as uuidv4 } from 'uuid';
import GroupInfo from '../../components/templates/GroupInfo';
import AcceptApplicationModalContainer from '../AcceptApplicationModalContainer';
import AddInvitationModalContainer from '../AddInvitationModalContainer';
import ChatContainer from '../ChatContainer';
import ConfirmationModalContainer from '../ConfirmationModalContainer';
import ConfirmationType from '../../Entities/Enums/ConfirmationType';
import ApplicationModel from '../../Models/ApplicationModel';
import GroupModel from '../../Models/GroupModel';
import InvitationModel from '../../Models/InvitationModel';
import MessageFileModel from '../../Models/MessageFileModel';
import NewFileModel from '../../Models/NewFileModel';
import NewFilesModel from '../../Models/NewFilesModel';
import SimpleGroupModel from '../../Models/SimpleGroupModel';
import { receiveApplication, reduceGroupApplication } from '../../Api/Hendlers/ApplicationHandlers';
import { receiveGroupData, receiveNewOwnerUserId, receiveLeftGroupUserId,
  receiveRomevedGroup, receiveNewGroupUser
} from '../../Api/Hendlers/GroupHandlers';
import {
  receiveFileConfirmations, receiveFiles, receiveMessage,
  receiveMessageConfirmation, receiveNewProfile, receiveNewUserData
} from '../../Api/Hendlers/SuperMessengerHandlers';
import { addFiles, sendMessage } from '../../Api/Services/SuperMessengerServices';
import { leaveGroup, removeGroup } from '../../Api/Services/GroupServices';
import { postNewFiles } from '../../Api/FileApi';
import GroupType from '../../Entities/Enums/GroupType';


export default function GroupContainer({
  className,
  size,
  signalRConnections,
  setMainPageData,
  onReceiveSendingResult,
  setRenderLoader,
  simpleMe,
  foundUsers,
  setFoundUsers,
  closeInvitation,
}) {
  const [groupData, setGroupData] = useState(new GroupModel());
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [renderMessageScrollButton, setRenderMessageScrollButton] = useState(false);
  const [renderAcceptApplicationModalContainer, setRenderAcceptApplicationModalContainer] = useState(false);
  const [renderAddInvitationModalContainer, setRenderAddInvitationModalContainer] = useState(false);
  const [renderConfirmationModalContainer, setRenderConfirmationModalContainer] = useState(false);
  const [confirmationType, setConfirmationType] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(new ApplicationModel());

  
  useEffect(() => {
    if (signalRConnections) {
      receiveApplication(handleReceiveApplication);
      reduceGroupApplication(handleReduceGroupApplication);
      receiveGroupData(handleReceiveGroupData);
      receiveMessage(handleReceiveMessage);
      receiveNewProfile(handleReceiveNewProfile);
      receiveNewUserData(handleReceiveNewUserData);
      receiveMessageConfirmation(handleReceiveMessageConfirmation);
      receiveFileConfirmations(handleReceiveFileConfirmations);
      receiveFiles(handleReceiveFiles);
      receiveNewOwnerUserId(handleReceiveNewOwnerUserId);
      receiveLeftGroupUserId(handleReceiveLeftGroupUserId);
      receiveRomevedGroup(handleReceiveRomevedGroup);
      receiveNewGroupUser(handleReceiveNewGroupUser);
    }
  }, [signalRConnections]);

  useEffect(() => {
    if(!renderMessageScrollButton){
      scrollToBottom("ChatMessages");
    }
  }, [groupData]);
  
  function handleReceiveRomevedGroup(groupId, groupName) {
    const removalResult = `${groupName} group was deleted`;
    setMainPageData(prevMainPageData => {
      if (prevMainPageData.groups) {
        prevMainPageData.groups = prevMainPageData.groups.filter(group => group.id !== groupId);
      }
      return { ...prevMainPageData };
    });
    onReceiveSendingResult(removalResult);
    setGroupData(prevGroupData => {
      if (prevGroupData.id === groupId) {
        setShowGroupInfo(false);
        return new GroupModel();
      }
      return { ...prevGroupData };
    });
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
        if (lastMessage && lastMessage.id === messageConfirmation.previousId) {
          lastMessage.id = messageConfirmation.id;
          lastMessage.sendDate = messageConfirmation.sendDate;
        }
      }
      return {...prevMainPageData};
    });
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

  function handleReceiveGroupData(groupData) {
    setGroupData(groupData);
    scrollToBottom("ChatMessages");
  }
  function scrollToBottom(id) {
    animateScroll.scrollToBottom({
      containerId: id,
    });
  }

  function handleReceiveApplication(application) {
    setGroupData(prevGroupData => {
      if (prevGroupData.id === application.groupId) {
        prevGroupData.applications.push(application);
      }
      return { ...prevGroupData };
    })
  }
  function handleReduceGroupApplication(userId, groupId) {
    setGroupData(prevGroupData => {
      if (prevGroupData && prevGroupData.id === groupId && prevGroupData.applications) {
        prevGroupData.applications = prevGroupData.applications.filter(application => application.user.id !== userId);
      }
      return { ...prevGroupData };
    });
  }

  function handleLeaveGroup() {
    setRenderLoader(true);
    setRenderConfirmationModalContainer(false);
    setConfirmationType(null);
    const groupId = groupData.id;
    setMainPageData(prevMainPageData => {
      const groups = prevMainPageData.groups.filter(group => group.id !== groupId);
      prevMainPageData.groups = groups;
      return {...prevMainPageData};
    });
    setShowGroupInfo(false);
    leaveGroup(groupId);
    setGroupData(new GroupModel());
  }
  function handleRemoveGroup() {
    setRenderLoader(true);
    setRenderConfirmationModalContainer(false);
    setConfirmationType(null);
    removeGroup(groupData.id);
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
    setMainPageData(prevMainPageData => {
      if (prevMainPageData && prevMainPageData.groups) {
        const needGroup = prevMainPageData.groups.find(group => group.type === GroupType.chat && group.name === user.email);
        if (needGroup) {
          needGroup.imageName = user.imageName;
        }
      }
      return { ...prevMainPageData };
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
  
  function handleReceiveNewGroupUser(userInGroup, groupId){
    setGroupData(prevGroupData => {
      if (prevGroupData.id === groupId) {
        prevGroupData.usersInGroup.push(userInGroup);
      }
      return {...prevGroupData};
    });
    
    closeApplication(groupId);
    closeInvitation(groupId);
  }
  function closeApplication(groupId) {
    setSelectedApplication(prevSelectedApplication => {
      if (prevSelectedApplication
        && prevSelectedApplication.groupId === groupId) {
        setRenderAcceptApplicationModalContainer(false);
        return new ApplicationModel();
      }
      return { ...prevSelectedApplication };
    });
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
      sendMessage(message);
      event.target.reset();
    }
    event.preventDefault();
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
          simpleMe,
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
      postNewFiles(formData, addFiles, newFilesModel);
    }
    event.preventDefault();
  }
  function handleClickShowGroupInfo(){
    setShowGroupInfo(prevShowGroupInfo => !prevShowGroupInfo);
  }
  function handleScrollMessage(e) {
    debounceScrollMessage(e);
  }
  const debounceScrollMessage = debounce((e) => {
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
  function handleClickMessageScrollButton(){
    scrollToBottom("ChatMessages");
  }
  function handleClickRenderNewMemberModal() {
    setRenderAddInvitationModalContainer(true);
  }
  function handleClickOpenAcceptApplications() {
    setRenderAcceptApplicationModalContainer(true);
  }
  function handleClickLeaveGroup() {
    setConfirmationType(ConfirmationType.leavingGroup);
    setRenderConfirmationModalContainer(true);
  }
  function handleClickRemoveGroup() {
    setConfirmationType(ConfirmationType.removingGroup);
    setRenderConfirmationModalContainer(true);
  }
  return (
    <>
      {groupData.id &&
        <ChatContainer
          className={className}
          size={size}
          showGroupInfo={showGroupInfo}
          simpleMe={simpleMe}
          groupData={groupData}
          onClickShowGroupInfo={handleClickShowGroupInfo}
          onScrollMessage={handleScrollMessage}
          renderMessageScrollButton={renderMessageScrollButton}
          onClickMessageScrollButton={handleClickMessageScrollButton}
          onSubmitSendMessage={handleSubmitSendMessage}
          onSubmitSendFiles={handleSubmitSendFiles}
        />
      }
      {
        showGroupInfo &&
        <GroupInfo
          groupData={groupData}
          onClickAddMember={handleClickRenderNewMemberModal}
          onClickOpenAcceptApplications={handleClickOpenAcceptApplications}
          onClickLeaveGroup={handleClickLeaveGroup}
          onClickRemoveGroup={handleClickRemoveGroup}
        />
      }
      <AcceptApplicationModalContainer
        renderAcceptApplicationModalContainer={renderAcceptApplicationModalContainer}
        setSelectedApplication={setSelectedApplication}
        selectedApplication={selectedApplication}
        setRenderLoader={setRenderLoader}
        setRenderAcceptApplicationModalContainer={setRenderAcceptApplicationModalContainer}
        groupApplications={groupData.applications}
      />
      <AddInvitationModalContainer
        renderAddInvitationModalContainer={renderAddInvitationModalContainer}
        setRenderAddInvitationModalContainer={setRenderAddInvitationModalContainer}
        setRenderLoader={setRenderLoader}
        simpleMe={simpleMe}
        simpleGroup={new SimpleGroupModel(groupData.id,
          groupData.name,
          groupData.imageName,
          groupData.type)}
        foundUsers={foundUsers}
        setFoundUsers={setFoundUsers}
      />
      <ConfirmationModalContainer
        renderConfirmationModalContainer={renderConfirmationModalContainer}
        confirmationType={confirmationType}
        setRenderConfirmationModalContainer={setRenderConfirmationModalContainer}
        onLeaveGroup={handleLeaveGroup}
        onRemoveGroup={handleRemoveGroup}
      />
    </>
  );
}