const { Model } = require('objection');

const User = require('@carecentive/carecentive-core/models/User');
const Ticket = require('./Ticket');
const Group = require('./Group');

class Chat extends Model {
  static get tableName() {
    return 'chat';
  }

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'chat.user_id',
        to: 'users.id'
      }
    },
    ticket: {
      relation: Model.BelongsToOneRelation,
      modelClass: Ticket,
      join: {
        from: 'chat.ticket_id',
        to: 'tickets.id'
      }
    },
    group: {
      relation: Model.BelongsToOneRelation,
      modelClass: Group,
      join: {
        from: 'chat.group_id',
        to: 'groups.id'
      }
    }
  };
}

module.exports = Chat;
