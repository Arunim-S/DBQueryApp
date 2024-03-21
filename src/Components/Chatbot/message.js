/**
 * Message Class
 * @type {Class}
 */
class Message {
  constructor(userName, question, answer, timestamp) {
    this.userName = userName;
    this.question = question;
    this.answer = answer;
    this.timestamp = timestamp;
  }
}

export default Message;
