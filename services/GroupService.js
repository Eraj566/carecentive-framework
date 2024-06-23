const Group = require('../models/Group');

class GroupService {

  static async getGroupByRoleId(roleId) {
    let group = await Group.query().where('role_id', roleId);

    if(group.length > 0){
      return group[0]
    }else{
      return {}
    }
    
  }
}

module.exports = GroupService;