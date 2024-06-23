const { Model } = require('objection');

const Role = require('@carecentive/carecentive-core/models/Role');

class Group extends Model {
  static get tableName() {
    return 'groups';
  }

  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: Role,
      join: {
        from: 'groups.role_id',
        to: 'roles.id'
      }
    }
  };
}

module.exports = Group;
