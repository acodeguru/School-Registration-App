export class LoggerService {
    debug(message: string)   { 
      let logEntry = this.createLogStatement('debug', message)
      console.info(logEntry);
      return logEntry; 
    }
  
    error(message: string) {
      let logEntry = this.createLogStatement('error', message) 
      console.error(logEntry); 
      return logEntry;
    }
  
    warn(message: string)  { 
      let logEntry = this.createLogStatement('warning', message) 
      console.warn(logEntry); 
      return logEntry; 
    }
  
    info(message: string) {
      let logEntry = this.createLogStatement('info', message) 
      console.info(logEntry); 
      return logEntry;
    }
  
    createLogStatement (level, message) {
      let SEPARATOR = " ";
      let date = this.getCurrentDate();
      return "[" + level + "]" + SEPARATOR + date + SEPARATOR + message;
    }
  
    getCurrentDate () {
      let now = new Date();
      return "[" + now.toLocaleString() + "]";
    }
  
    constructor() { }
  }