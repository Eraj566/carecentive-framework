const User = require('@carecentive/carecentive-core/models/User');
const Ticket = require("../models/Ticket");

class TicketService {

  // static async getActivitiesForUser(userId) {
  //   let user = await User.query().findById(userId)
  
  //   // Get all questionnaires of this user. Order by oldest first.
  //   let userQuestionnaires = await Questionnaire.query().select('id', 'datetime', 'questionnaire').where({
  //     user_id: userId
  //   }).orderBy('datetime', 'ASC')
  
  //   // Prepare the output array
  //   let userAvailableActivities = {activityState: "", activities: {}}

  //   userAvailableActivities.activities.sampleQuestionnaire = true;

  //   return userAvailableActivities;
  // }
 // title, description, 
  static async createTicket(title, description, userId) {
    let userCount = await User.query().where('id', userId).resultSize();

    if (userCount === 0) {
      throw new Error("userId not correct")
    }

    return await Ticket.query().insert({
      title: title,
      description: description,
      userId: userId
    });
  }

  static async getTicketByUserId(userId) {
    let ticket = await Ticket.query().where('userId', userId).whereIn("status", ["open", "in-progress"]);

    // if (userCount === 0) {
    //   throw new Error("userId not correct")
    // }

    return ticket
  }

  static async getAllOpenTickets() {
    let ticket = await Ticket.query().whereIn("status", ["open", "in-progress"]);

    // if (userCount === 0) {
    //   throw new Error("userId not correct")
    // }

    return ticket
  }

  static async updateTicketStatus(ticket_id ,status) {
    let ticket = await Ticket.query().where("id", ticket_id).update({ status });

    return ticket
  }

}

module.exports = TicketService;