export default class MessageFileModel { 
  constructor(id, name, contentName, sendDate, groupId, user, isConfirmed) {
    this.id = id;
    this.name = name;
    this.contentName = contentName;
    this.sendDate = sendDate;
    this.groupId = groupId;
    this.user = user;
    this.isConfirmed = isConfirmed;
  }
}