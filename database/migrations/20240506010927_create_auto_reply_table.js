exports.up = function (knex) {
    return knex.schema.createTable('auto_reply', function (table) {
      table.increments('id').primary();
      table.string('keyword').notNullable().unique();
      table.text('reply_message').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('auto_reply');
  };
  