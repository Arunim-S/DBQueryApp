/**
 * User Data Class
 * @type {Class}
 */
class UserData {
  constructor(userId, userName, chats, timestamp) {
    this.userId = userId;
    this.userName = userName;
    this.chats = chats;
    this.timestamp = timestamp;
  }
}

export default UserData;
