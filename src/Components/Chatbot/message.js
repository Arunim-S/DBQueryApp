/**
 * Message Class
 * @type {Class}
 */
class Message {
  constructor(userName, question, answer, timestamp, databaseName, containerName) {
    this.userName = userName;
    this.question = question;
    this.answer = answer;
    this.timestamp = timestamp;
    this.databaseName = databaseName;
    this.containerName = containerName;
  }
}

export default Message;
