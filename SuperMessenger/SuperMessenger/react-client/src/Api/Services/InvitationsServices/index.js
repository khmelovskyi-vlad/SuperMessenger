let connection = null;
let onReceiveSendingResult = null;
let appErrorHandler = null;


export function initializeData(_connection, _onReceiveSendingResult, _appErrorHandler) {
  connection = _connection;
  onReceiveSendingResult = _onReceiveSendingResult;
  appErrorHandler = _appErrorHandler;
}

export function sendMyInvitations() {
  const methodName = "SendMyInvitations";
  connection.invoke(methodName).catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function sendInvitation(invitation) {
  const methodName = "SendInvitation";
  connection.invoke(methodName, invitation)
    .then(() => onReceiveSendingResult("The invitation was successfully submitted"))
    .catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function acceptInvitation(invitation) {
  const methodName = "AcceptInvitation";
  connection.invoke(methodName, invitation)
    .then(() => onReceiveSendingResult("The invitation was successfully accepted"))
    .catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function declineInvitation(invitation) {
  const methodName = "DeclineInvitation";
  connection.invoke(methodName, invitation)
    .then(() => onReceiveSendingResult("The invitation was successfully declined"))
    .catch((err) => appErrorHandler.hubHandle(err, methodName));
}
const InvitationsServices = {
  initializeData,
  sendMyInvitations,
  acceptInvitation,
  declineInvitation
}
export default InvitationsServices;