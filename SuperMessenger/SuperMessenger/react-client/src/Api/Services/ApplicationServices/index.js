let connection = null;
let onReceiveSendingResult = null;
let appErrorHandler = null;


export function initializeData(_connection, _onReceiveSendingResult, _appErrorHandler) {
  connection = _connection;
  onReceiveSendingResult = _onReceiveSendingResult;
  appErrorHandler = _appErrorHandler;
}

export function sendApplication(application) {
  const methodName = "SendApplication";
  connection.invoke(methodName, application)
    .then(() => onReceiveSendingResult("The application was successfully submitted"))
    .catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function acceptApplication(application) {
  const methodName = "AcceptApplication";
  connection.invoke(methodName, application)
    .then(() => onReceiveSendingResult("The application was successfully accepted"))
    .catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function rejectApplication(application) {
  const methodName = "RejectApplication";
  connection.invoke(methodName, application)
    .then(() => onReceiveSendingResult("The application was successfully submitted"))
    .catch((err) => appErrorHandler.hubHandle(err, methodName));
}
const ApplicationServices = {
  initializeData,
  sendApplication,
  acceptApplication,
  rejectApplication
}
export default ApplicationServices;