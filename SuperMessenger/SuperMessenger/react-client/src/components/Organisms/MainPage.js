import React from 'react';
import SimpleUserModel from '../../SimpleUserModel';
import NewMemberModal from '../Modals/NewMemberModal';
import AddInvitations from '../Molecules/AddInvitations';
import ChangeProfile from '../Molecules/ChangeProfile';
import Chat from '../Molecules/Chat';
import CreateGroupForm from '../Molecules/CreateGroupForm';
import GroupInfo from '../Molecules/GroupInfo';
import Groups from '../Molecules/Groups';
export default function MainPage(props) {
  return (
    <div className="row w-100 m-0">
      {/* <section>
        <button
          onClick={() => props.api.current.sendFirstData()}>
          get first data
        </button>
        { props.mainPageData.imageId &&
          <img src={`/avatars/${props.mainPageData.imageId}.jpg`} />
        }
      </section> */}
      {
        props.renderNewMemberModal &&
        <NewMemberModal
          foundUsers={props.foundUsers}
          onChangeNewMemberModal={props.onChangeNewMemberModal}
          onClickCloseModal={props.onClickRenderNewMemberModal}
        />
      }
      <Groups groups={props.mainPageData.groups} selectedGroupOnClick={props.selectedGroupOnClick} />
      {
        props.groupData.id &&
        <Chat groupData={props.groupData}
          simpleMe={new SimpleUserModel(props.mainPageData.id, props.mainPageData.email, props.mainPageData.imageId)}
          onSubmitSendMessage={props.onSubmitSendMessage}
          showGroupInfo={props.showGroupInfo}
          onClickShowGroupInfo={props.onClickShowGroupInfo}
      />
      }
      {
        props.showGroupInfo &&
        <GroupInfo
          groupData={props.groupData}
          onClickNewMember={props.onClickNewMember}
          onClickAddMember={props.onClickRenderNewMemberModal}
        />
      }
      {/*<ChangeProfile api={props.api} /> 
      <CreateGroupForm api={props.api} />*/}
      {/* <AddInvitations groups={props.mainPageData.groups}/> */}
    </div>
  );
}