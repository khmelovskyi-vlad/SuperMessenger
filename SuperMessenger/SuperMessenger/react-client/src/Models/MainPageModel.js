export default class MainPageModel { 
  constructor(id, email, firstName, lastName, imageName, invitationCount, applicationCount, countries, groups) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.imageName = imageName;
    this.invitationCount = invitationCount;
    this.applicationCount = applicationCount;
    this.countries = countries;
    this.groups = groups;
  }
}