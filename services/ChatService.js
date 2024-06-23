const User = require('@carecentive/carecentive-core/models/User');
const Chat = require('../models/Chat');

class ChatService {

 static async createChat(message, user_id, ticket_id, group_id, attachment) {
  let userCount = await User.query().where('id', user_id).resultSize();

  if (userCount === 0) {
    throw new Error("userId not correct")
  }

  if(ticket_id){
    await Chat.query().insert({
      message: message,
      user_id: user_id,
      ticket_id: ticket_id,
      attachment: attachment ? attachment : null
    });
  }else if(group_id){
    await Chat.query().insert({
      message: message,
      user_id: user_id,
      group_id: group_id,
      attachment: attachment ? attachment : null
    });
  }
}

static async getChatByGroupId(group_id) {
  let chat = await Chat.query().where('group_id', group_id);
  return chat
}

static async getChatByTicketId(ticket_id) {
  let chat = await Chat.query().where('ticket_id', ticket_id);
  return chat
}

}

module.exports = ChatService;