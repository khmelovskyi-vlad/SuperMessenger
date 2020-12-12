export default class GroupModel { 
  constructor(id, name, creationDate, imageName, type, isCreator, usersInGroup, sentFiles, messages, invitations, applications) {
    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
    this.imageName = imageName;
    this.type = type;
    this.isCreator = isCreator;
    this.usersInGroup = usersInGroup;
    this.sentFiles = sentFiles;
    this.messages = messages;
    this.invitations = invitations;
    this.applications = applications;
  }
}