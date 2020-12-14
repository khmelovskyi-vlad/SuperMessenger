export default class FileConfirmationModel{
  constructor(id, previousId, sendDate, groupId, contentName ) {
    this.id = id;
    this.previousId = previousId;
    this.sendDate = sendDate;
    this.groupId = groupId;
    this.contentName = contentName;
  }
}