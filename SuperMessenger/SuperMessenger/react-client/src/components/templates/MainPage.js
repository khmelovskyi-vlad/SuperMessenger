import React from 'react';
import SimpleGroupModel from '../../Models/SimpleGroupModel';
import SimpleUserModel from '../../Models/SimpleUserModel';
import AcceptApplicationModal from './Modals/AcceptApplicationModal';
import AcceptApplicationsModal from './Modals/AcceptApplicationsModal';
import AcceptInvitationModal from './Modals/AcceptInvitationModal';
import AcceptInvitationsModal from './Modals/AcceptInvitationsModal';
import ChangeProfileModal from './Modals/ChangeProfileModal';
import NewMemberModal from './Modals/NewMemberModal';
import SearchGroupToApplicationModal from './Modals/SearchGroupToApplicationModal';
import SendingResultModal from './Modals/SendingResultModal';
import GroupInfo from './GroupInfo';
import Div from '../atoms/Div';
import LoaderModal from './Modals/LoaderModal';
import ChatContainer from '../../containers/ChatContainer';
import GroupListContainer from '../../containers/GroupListContainer';
import AddApplicationModalContainer from '../../containers/AddApplicationModalContainer';
import AddInvitationModalContainer from '../../containers/AddInvitationModalContainer';
import ConfirmationModalContainer from '../../containers/ConfirmationModalContainer';
import CreateGroupModalContainer from '../../containers/CreateGroupModalContainer';


export default function MainPage(props) {
  return (
    <Div className="row w-100 m-0">
      {
        props.renderLoader &&
        <LoaderModal
          wrapperRef={props.wrapperRef}
        />
      }
      {
        props.renderConfirmation &&
        <ConfirmationModalContainer
          confirmationType={props.confirmationType}
          onAcceptConfirmation={props.onAcceptConfirmation}
          onRejectConfirmation={props.onRejectConfirmation}
          wrapperRef={props.wrapperRef}
        />
      }
      {
        props.renderChangeProfile &&
        <ChangeProfileModal
          onSubmitChangeProfile={props.onSubmitChangeProfile}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderCreateGroup &&
        <CreateGroupModalContainer
          simpleMe={new SimpleUserModel(props.mainPageData.id, props.mainPageData.email, props.mainPageData.imageName)}
          onCheckGroupName={props.onCheckGroupName}
          onSubmitCreateGroup={props.onSubmitCreateGroup}
          myId={props.myId}
          canUseGroupName={props.canUseGroupName}
          foundUsers={props.foundUsers}
          onChangeSearchUsers={props.onChangeSearchUsers}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderAddApplication &&
        <AddApplicationModalContainer
          onSubmitAddApplication={props.onSubmitAddApplication}
          selectedGroupId={props.selectedGroupId}
          simpleMe={new SimpleUserModel(props.mainPageData.id, props.mainPageData.email, props.mainPageData.imageName)}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderSearchGroupToApplicationModal &&
        <SearchGroupToApplicationModal
          foundGroups={props.foundGroups}
          onChangeSearchGroupToApplicationModal={props.onChangeSearchGroupToApplicationModal}
          onClickSelectedGroupModal={props.onClickSelectedGroupModal}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderMyInvitation &&
        <AcceptInvitationModal
          selectedInvitation={props.selectedInvitation}
          onClickAccept={props.onClickAcceptInvitation}
          onClickDecline={props.onClickDeclineInvitation}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderMyInvitations &&
        <AcceptInvitationsModal
          myInvitations={props.myInvitations}
          onClickOpenAcceptInvitation={props.onClickOpenAcceptInvitation}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderGroupApplications &&
        <AcceptApplicationsModal
          myApplications={props.groupData.applications}
          onClickOpenAcceptApplication={props.onClickOpenAcceptApplication}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderGroupApplication &&
        <AcceptApplicationModal
          selectedApplication={props.selectedApplication}
          onClickAccept={props.onClickAcceptApplication}
          onClickDecline={props.onClickDeclineApplication}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderSendingResult &&
        <SendingResultModal
          sendingResult={props.sendingResult}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderNewMemberModal &&
        <NewMemberModal
          foundUsers={props.foundUsers}
          onChangeSearchNoInvitedUsers={props.onChangeSearchNoInvitedUsers}
          onClickSelectedUser={props.onClickSelectedUser}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderAddInvitationModal &&
        <AddInvitationModalContainer
          onSubmitAddInvitation={props.onSubmitAddInvitation}
          selectedUser={props.selectedUser}
          simpleMe={new SimpleUserModel(props.mainPageData.id, props.mainPageData.email, props.mainPageData.imageName)}
          simpleGroup={new SimpleGroupModel(props.groupData.id,
            props.groupData.name,
            props.groupData.imageName,
            props.groupData.type)}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      <GroupListContainer groups={props.mainPageData.groups} onClickSelectedGroup={props.onClickSelectedGroup} />
      {
        props.groupData.id &&
        <ChatContainer
          groupData={props.groupData}
          simpleMe={new SimpleUserModel(props.mainPageData.id, props.mainPageData.email, props.mainPageData.imageName)}
          onSubmitSendMessage={props.onSubmitSendMessage}
          showGroupInfo={props.showGroupInfo}
          onClickShowGroupInfo={props.onClickShowGroupInfo}
          onSubmitSendFiles={props.onSubmitSendFiles}
          onScrollMessage={props.onScrollMessage}
          renderMessageScrollButton={props.renderMessageScrollButton}
          onClickMessageScrollButton={props.onClickMessageScrollButton}
        />
      }
      {
        props.showGroupInfo &&
        <GroupInfo
          groupData={props.groupData}
          onClickAddMember={props.onClickRenderNewMemberModal}
          onClickOpenAcceptApplications={props.onClickOpenAcceptApplications}
          onClickLeaveGroup={props.onClickLeaveGroup}
          onClickRemoveGroup={props.onClickRemoveGroup}
        />
      }
    </Div>
  );
}