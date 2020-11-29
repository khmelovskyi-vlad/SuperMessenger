export default class NewGroupModel {
  constructor(name, type, haveImage, invitations, previousImageId) {
    this.name = name;
    this.type = type;
    this.haveImage = haveImage;
    this.invitations = invitations;
    this.previousImageId = previousImageId;
  }
}