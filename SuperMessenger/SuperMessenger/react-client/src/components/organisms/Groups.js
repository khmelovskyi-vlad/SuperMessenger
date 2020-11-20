import React from 'react';
import Div from '../atoms/Div';
import LastMessage from '../molecules/LastMessage';
import SimpleContent from '../molecules/SimpleContent';
export default function Groups(props) {
(function(){
  if (typeof Object.defineProperty === 'function'){
    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

  function sb(f){
    for (var i=this.length;i;){
      var o = this[--i];
      this[i] = [].concat(f.call(o,o,i),o);
    }
    this.sort(function(a,b){
      for (var i=0,len=a.length;i<len;++i){
        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
      }
      return 0;
    });
    for (var i=this.length;i;){
      this[--i]=this[i][this[i].length-1];
    }
    return this;
  }
})();
  return (
    <Div className="col-4 m-0 p-0">
      <Div className="row flex-column w-100 m-0 p-0 flex-nowrap" style={{overflowY: "auto", overflowX: "hidden", maxHeight: "90vh"}}>
        {
          props.groups && props.groups.sort((a, b) => {
            if (a.lastMessage.sendDate == undefined) {
              return 1;
            }
            if (b.lastMessage.sendDate == undefined) {
              return -1;
            }
            return a.lastMessage.sendDate - b.lastMessage.sendDate;
          })
            .map(group =>
            <SimpleContent
              onClickSelectId={props.onClickSelectedGroup}
              id={group.id}
              key={group.id}
              simpleContentClasses="simpleGroupContent"
              imgContentClasses="simpleImgContent"
              imgClasses="simpleImg" 
              simpleNameClasses="simpleName"
              isUser={false}
              imageId={group.imageId}
              name={group.name}
              bottomData={<LastMessage lastMessage={group.lastMessage}/>}
            />)
          // props.groups && foreach(group in props.groups){
          //   <SimpleGroupContent group={group}/>
          // }
        }
      </Div>
    </Div>
  );
}