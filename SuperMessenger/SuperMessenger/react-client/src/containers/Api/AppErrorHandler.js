import React from 'react'
require("dotenv").config();
export default class AppErrorHandler {
  constructor(setError) {
    this.setError = setError;
    this.handling = this.handling.bind(this);
  }
  handling(error, methodName) {
    const errorMessageLength = parseInt(process.env.REACT_APP_ERROR_MESSAGE_LENGTH);
    const firstPartErrorLength = errorMessageLength + methodName.length;
    const errorMessage = error.message;
    console.log(error);
    console.log(error.message);
    if (errorMessage.length > errorMessageLength) {
      const firstPartError = errorMessage.substring(0, firstPartErrorLength);
      if (firstPartError === `An unexpected error occurred invoking '${methodName}' on the server. HubException:`) {
        const errorContent = errorMessage.substring(firstPartErrorLength + 1, firstPartErrorLength + 4);
        switch (errorContent) {
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
            this.setElement("unknown error");
            break;
        }
      }
      else {
        this.setElement("unknown error");
      }
    }
    else {
      this.setElement("unknown error");
    }
  }
  setElement(errorContent) {
    this.setError(this.getElement(errorContent));
  }
  getElement(errorContent) {
    return <h1>{errorContent}</h1>
  }
}