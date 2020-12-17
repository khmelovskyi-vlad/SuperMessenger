export default class MessageFileModel { 
  constructor(id, name, sendDate, groupId, user, isConfirmed) {
    this.id = id;
    this.name = name;
    this.sendDate = sendDate;
    this.groupId = groupId;
    this.user = user;
    this.isConfirmed = isConfirmed;
  }
}