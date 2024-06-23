const { Model } = require('objection');

const User = require('@carecentive/carecentive-core/models/User');

class Ticket extends Model {
  static get tableName() {
    return 'tickets';
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'tickets.userId',
        to: 'users.id'
      }
    }
  };
}

module.exports = Ticket;
