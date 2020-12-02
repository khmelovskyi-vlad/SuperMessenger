

export default class FileApi{
  constructor(appErrorHandler) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler
  }
  sendNewGroup(newGroup) {
    let req = new XMLHttpRequest();                            
    req.open("POST", 'https://localhost:44370/api/Groups');
    req.send(newGroup);
    // axios.post("https://localhost:44370/api/Groups", newGroup, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })
    //   .then(function () {
    //     console.log('SUCCESS!!');
    //     })
    //     .catch(function(){
    //       console.log('FAILURE!!');
    //     })
    //   ;
  }
  sendNewFiles(newFileModel) {
    let req = new XMLHttpRequest();                            
    req.open("POST", 'https://localhost:44370/api/SentFiles');
    // req.setRequestHeader('Content-Type', 'application/json');
    // req.setRequestHeader(invitations2);
    // req.send(newGroup, invitations2);
    req.send(newFileModel);
  }
  changeProfile(profile) {
    let req = new XMLHttpRequest();                            
    req.open("PUT", 'https://localhost:44370/api/Users');
    console.log(profile);
    req.send(profile);
  }
}