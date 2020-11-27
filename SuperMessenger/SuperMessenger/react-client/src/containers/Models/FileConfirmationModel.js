export default class FileConfirmationModel{
  constructor(id, previousId, sendDate, groupId, contentId ) {
    this.id = id;
    this.previousId = previousId;
    this.sendDate = sendDate;
    this.groupId = groupId;
    this.contentId = contentId;
  }
}