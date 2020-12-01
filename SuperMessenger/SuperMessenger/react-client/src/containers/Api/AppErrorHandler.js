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
        console.log(firstPartError);
        const errorContent = errorMessage.substring(81);
        this.setError(<h1>{errorContent}    {firstPartError}</h1>);
      }
      else {
        this.setError(<h1>{errorMessage}</h1>);
      }
    }
    else {
      this.setError(<h1>{errorMessage}</h1>);
    }
  }
}