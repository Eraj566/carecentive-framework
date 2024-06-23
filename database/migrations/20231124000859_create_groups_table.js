exports.up = function (knex) {
    return knex.schema.createTable('groups', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('role_id').unsigned().notNullable();
      
      // Foreign key constraint
      table.foreign('role_id').references('roles.id');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('groups');
  };
  