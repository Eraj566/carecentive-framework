const User = require('@carecentive/carecentive-core/models/User');
const Chat = require('../models/Chat');
const AutoReply = require("../models/AutoReply");

class AutoReplyService {

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

  static async getAutoReply(message) {
    let reply = await AutoReply.query();
    let keywordmatric = []

    reply.map((data, index) => {
      let keyword = data.keyword.split(',');
      let keywordCount = 0;

      keyword.map((key) => {
        if (message.includes(key)) {
          keywordCount += 1
        }
      })

      keywordmatric[index] = parseFloat((keywordCount/keyword.length).toFixed(2));
    })

    let selectedReply = Math.max(...keywordmatric)
    if(selectedReply < 0.5){
      return {}
    }else{
      selectedReply = reply[keywordmatric.indexOf(selectedReply)]
      console.log(Math.max(...keywordmatric), keywordmatric.indexOf(0.75), keywordmatric, 'here');
      // if (userCount === 0) {
      //   throw new Error("userId not correct")
      // }

      return selectedReply;
    }
    
  }

}

module.exports = AutoReplyService;