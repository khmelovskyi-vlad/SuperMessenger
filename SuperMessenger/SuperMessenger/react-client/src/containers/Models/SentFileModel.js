export default class SentFileModel { 
  constructor(id, name, contentId, sendDate, groupId, user, isConfirmed) {
    this.id = id;
    this.name = name;
    this.contentId = contentId;
    this.sendDate = sendDate;
    this.groupId = groupId;
    this.user = user;
    this.isConfirmed = isConfirmed;
  }
}