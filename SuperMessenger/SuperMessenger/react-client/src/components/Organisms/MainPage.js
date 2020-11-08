import React from 'react';
import ChangeProfile from '../Molecules/ChangeProfile';
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
      </section>
      <CreateGroupForm api={props.api} /> */}
      <Groups groups={props.mainPageData.groups}/>
      <ChangeProfile api={props.api}/>
    </div>
  );
}