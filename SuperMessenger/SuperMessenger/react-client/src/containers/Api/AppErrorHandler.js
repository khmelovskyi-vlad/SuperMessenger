import React from 'react'
export default class AppErrorHandler {
  constructor(setError) {
    this.setError = setError;
    this.handling = this.handling.bind(this);
  }
  handling(error) {
    const errorMessage = error.message;
    if (errorMessage.length > 81) {
      const firstPartError = errorMessage.substring(0, 80);
      if (firstPartError === "An unexpected error occurred invoking 'SendMessage' on the server. HubException:") {
        const errorContent = errorMessage.substring(81, 83);
        switch (errorContent) {
          case "500":
            return this.getElement("There was an error on the server and the request could not be completed");
          default:
            return this.getElement("unknown error");
        }
      }
      else {
        return this.getElement("unknown error");
      }
    }
    else {
      return this.getElement("unknown error");
    }
  }
  getElement(errorContent) {
    return <h1>{errorContent}</h1>
  }
}