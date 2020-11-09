import React from 'react';
import SimpleUser from '../../SimpleUser';
import AddInvitations from '../Molecules/AddInvitations';
import ChangeProfile from '../Molecules/ChangeProfile';
import Chat from '../Molecules/Chat';
import CreateGroupForm from '../Molecules/CreateGroupForm';
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
      <Groups groups={props.mainPageData.groups} selectedGroupOnClick={props.selectedGroupOnClick} />
      { groupData &&
        <Chat groupData={props.groupData}
          simpleMe={new SimpleUser(props.mainPageData.id, props.mainPageData.email, props.mainPageData.imageId)}
          onSubmitSendMessage={props.onSubmitSendMessage}/>
      }
      {/* <ChangeProfile api={props.api} />
      <CreateGroupForm api={props.api} /> */}
      {/* <AddInvitations groups={props.mainPageData.groups}/> */}
    </div>
  );
}