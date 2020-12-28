import ApplicationModel from "../../../Models/ApplicationModel";
import SimpleUserModel from "../../../Models/SimpleUserModel";

let connection = null;
let setConnectedMethods = null;

export function initializeData(_connection, _setConnectedMethods) {
  connection = _connection;
  setConnectedMethods = _setConnectedMethods;
}


export function receiveApplication(onReceiveApplication) {
  connection.on("ReceiveApplication", function (application) {
    const myApplication = new ApplicationModel(
      application.Value,
      new Date(application.SendDate),
      application.GroupId,
      new SimpleUserModel(application.User.Id,
        application.User.Email,
        application.User.ImageName));
    onReceiveApplication(myApplication);
  });
  setConnectedMethods(prev => prev + 1);
};
export function increaseMyApplicationsCount(onIncreaseMyApplicationsCount) {
  connection.on("IncreaseMyApplicationsCount", function (applicationsCount) {
    onIncreaseMyApplicationsCount(applicationsCount);
  });
  setConnectedMethods(prev => prev + 1);
};
export function reduceMyApplicationsCount(onReduceMyApplicationsCount) {
  connection.on("ReduceMyApplicationsCount", function (applicationsCount) {
    onReduceMyApplicationsCount(applicationsCount);
  });
  setConnectedMethods(prev => prev + 1);
};
export function reduceGroupApplication(onReduceGroupApplication) {
  connection.on("ReduceGroupApplication", function (userId, groupId) {
    onReduceGroupApplication(userId, groupId);
  });
  setConnectedMethods(prev => prev + 1);
};
const ApplicationHandlers = {
  initializeData,
  receiveApplication,
  increaseMyApplicationsCount,
  reduceMyApplicationsCount,
  reduceGroupApplication
};
export default ApplicationHandlers;