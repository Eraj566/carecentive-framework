const { Model } = require('objection');

class AutoReply extends Model {
  static get tableName() {
    return 'auto_reply';
  }

}

module.exports = AutoReply;
