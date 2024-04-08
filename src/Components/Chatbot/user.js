/**
 * User Data Class
 * @type {Class}
 */
class UserData {
  constructor(userId, userName, chats, timestamp, databases) {
    this.userId = userId;
    this.userName = userName;
    this.chats = chats;
    this.timestamp = timestamp;
    this.databases = databases
  }
}

export default UserData;
