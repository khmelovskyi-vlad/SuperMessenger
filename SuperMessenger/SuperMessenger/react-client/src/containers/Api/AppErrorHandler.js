import React from 'react'
require("dotenv").config();
export default class AppErrorHandler {
  constructor(setError) {
    this.setError = setError;
    this.webApiHandle = this.webApiHandle.bind(this);
    this.hubHandle = this.hubHandle.bind(this);
  }
  checkFirstPartError(needFirstPartError, firstPartErrorLength, errorMessage) {
    console.log(errorMessage.length);
    if (errorMessage.length >= firstPartErrorLength + 4) { 
      const firstPartError = errorMessage.substring(0, firstPartErrorLength);
    console.log(errorMessage);
    console.log(firstPartError);
      if (firstPartError === needFirstPartError) {
    console.log(errorMessage);
        const statusCode = errorMessage.substring(firstPartErrorLength + 1, firstPartErrorLength + 4);
        this.handleError(statusCode);
        return;
      }
    }
    this.setElement("unknown error");
  }
  webApiHandle(error) {
    const errorMessageLength = parseInt(process.env.REACT_APP_WEB_API_ERROR_MESSAGE_LENGTH);
    const errorMessage = error.message;
    console.log(errorMessageLength);
    this.checkFirstPartError("Request failed with status code", errorMessageLength, errorMessage);
  }
  hubHandle(error, methodName) {
    const errorMessageLength = parseInt(process.env.REACT_APP_ERROR_MESSAGE_LENGTH);
    const firstPartErrorLength = errorMessageLength + methodName.length;
    const errorMessage = error.message;
    this.checkFirstPartError(`An unexpected error occurred invoking '${methodName}' on the server. HubException:`,
      firstPartErrorLength,
      errorMessage);
  }
  handleError(statusCode) {
    switch (statusCode) {
      case "403":
        this.setElement("There was an error on the server and the request could not be completed");
        break;
      case "404":
        this.setElement("There was an error on the server and the request could not be completed");
        break;
      case "500":
        this.setElement("There was an error on the server and the request could not be completed");
        break;
      default:
        this.setElement("Unknown error");
        break;
    }
  }
  setElement(errorContent) {
    this.setError(this.getElement(errorContent));
  }
  getElement(errorContent) {
    return <h1>{errorContent}</h1>
  }
}